import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  FileText,
  Flag,
  RefreshCcw,
  Target,
} from "lucide-react";
import { useEffect, useMemo, useReducer, useState } from "react";
import {
  Activity,
  Option,
  activityOptions,
  aeiOptions,
  costCards,
  inputOptions,
  oeiOptions,
  procurementCases,
  stageImages,
  stageScores,
} from "./data/cunamasCase";
import {
  classifyFeedback,
  getLevel,
  getSelectionIssues,
  isExactSelection,
  scoreStage,
} from "./utils/scoring";

type StageId = "welcome" | "oei" | "aei" | "activities" | "inputs" | "procurement" | "report";
type ScoredStageId = Exclude<StageId, "welcome" | "report">;

type StageState = {
  selected: string[];
  attempts: number;
  approved: boolean;
  score: number;
  feedback: string[];
};

type SimulatorState = {
  currentStage: StageId;
  stages: Record<ScoredStageId, StageState>;
  gptRecommendation: string;
};

const emptyStage: StageState = { selected: [], attempts: 0, approved: false, score: 0, feedback: [] };
const storageKey = "cunamas-simulator-state-v1";

const initialState: SimulatorState = {
  currentStage: "welcome",
  stages: {
    oei: { ...emptyStage },
    aei: { ...emptyStage },
    activities: { ...emptyStage },
    inputs: { ...emptyStage },
    procurement: { ...emptyStage },
  },
  gptRecommendation: "",
};

type Action =
  | { type: "toggle"; stage: ScoredStageId; id: string }
  | { type: "selectProc"; id: string; answer: string }
  | { type: "validate"; stage: ScoredStageId; correctIds: string[]; messages: string[] }
  | { type: "goto"; stage: StageId }
  | { type: "setGpt"; text: string }
  | { type: "reset" }
  | { type: "hydrate"; state: SimulatorState };

function reducer(state: SimulatorState, action: Action): SimulatorState {
  if (action.type === "hydrate") return action.state;
  if (action.type === "reset") return initialState;
  if (action.type === "goto") return { ...state, currentStage: action.stage };
  if (action.type === "setGpt") return { ...state, gptRecommendation: action.text };
  if (action.type === "toggle") {
    const stage = state.stages[action.stage];
    const selected = stage.selected.includes(action.id)
      ? stage.selected.filter((id) => id !== action.id)
      : [...stage.selected, action.id];
    return {
      ...state,
      stages: {
        ...state.stages,
        [action.stage]: { ...stage, selected, feedback: stage.approved ? stage.feedback : [] },
      },
    };
  }
  if (action.type === "selectProc") {
    const stage = state.stages.procurement;
    const withoutCase = stage.selected.filter((value) => !value.startsWith(`${action.id}:`));
    return {
      ...state,
      stages: {
        ...state.stages,
        procurement: { ...stage, selected: [...withoutCase, `${action.id}:${action.answer}`] },
      },
    };
  }
  const stage = state.stages[action.stage];
  const approved = isExactSelection(stage.selected, action.correctIds);
  const attempts = approved ? stage.attempts + (stage.approved ? 0 : 1) : stage.attempts + 1;
  const score = approved ? scoreStage(stageScores[action.stage], attempts - 1) : stage.score;
  return {
    ...state,
    stages: {
      ...state.stages,
      [action.stage]: {
        ...stage,
        attempts,
        approved,
        score,
        feedback: action.messages,
      },
    },
  };
}

function formatMoney(value: number) {
  return `S/ ${new Intl.NumberFormat("es-PE").format(value)}`;
}

function correctIds(options: Option[]) {
  return options.filter((option) => option.correct).map((option) => option.id);
}

function buildFeedback(options: Option[], selected: string[], correct: string[]) {
  const kind = classifyFeedback(selected, correct);
  const { missing, incorrect } = getSelectionIssues(selected, correct);
  const incorrectMessages = incorrect
    .map((id) => options.find((option) => option.id === id)?.feedback)
    .filter(Boolean) as string[];

  if (kind === "success") return ["Respuesta correcta. Puedes continuar a la siguiente etapa."];
  const messages: string[] = [];
  if (missing.length > 0) {
    messages.push("Faltan opciones correctas. Revisa que servicio presta Cuna Mas y que AEI/AO corresponde a desarrollo infantil temprano.");
  }
  if (incorrect.length > 0) {
    messages.push("Seleccionaste opciones no relacionadas con la cadena PEI-POI-contratacion del caso.");
    messages.push(...incorrectMessages);
  }
  if (kind === "mixed" || kind === "review") {
    messages.push("Revisa la cadena PEI -> AEI -> AO -> insumo -> contratacion antes de validar nuevamente.");
  }
  messages.push(`Seleccion correcta esperada: ${correct.join(", ")}.`);
  return messages;
}

function StageShell({
  title,
  eyebrow,
  image,
  children,
}: {
  title: string;
  eyebrow: string;
  image: string;
  children: React.ReactNode;
}) {
  return (
    <section className="stage-shell">
      <div className="stage-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(14,43,70,.9), rgba(26,96,92,.55)), url(${image})` }}>
        <span>{eyebrow}</span>
        <h1>{title}</h1>
      </div>
      {children}
    </section>
  );
}

function ScoreBoard({ state }: { state: SimulatorState }) {
  const total = Object.values(state.stages).reduce((sum, stage) => sum + stage.score, 0);
  return (
    <aside className="scoreboard">
      <div>
        <span className="score-label">Puntaje</span>
        <strong>{total}/100</strong>
      </div>
      <div>
        <span className="score-label">Etapa</span>
        <strong>{Object.keys(state.stages).filter((key) => state.stages[key as ScoredStageId].approved).length}/5</strong>
      </div>
      <button className="ghost-button" onClick={() => window.dispatchEvent(new Event("reset-simulator"))}>
        <RefreshCcw size={17} /> Reiniciar simulacion
      </button>
    </aside>
  );
}

function FeedbackPanel({ stage }: { stage: StageState }) {
  if (stage.feedback.length === 0) return null;
  return (
    <div className={stage.approved ? "feedback success" : "feedback warning"}>
      <strong>{stage.approved ? "Etapa aprobada" : "Retroalimentacion"}</strong>
      {stage.feedback.map((message) => (
        <p key={message}>{message}</p>
      ))}
    </div>
  );
}

function OptionCards({
  options,
  selected,
  onToggle,
}: {
  options: Option[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="option-grid">
      {options.map((option) => (
        <label className={`option-card ${selected.includes(option.id) ? "selected" : ""}`} key={option.id}>
          <input type="checkbox" checked={selected.includes(option.id)} onChange={() => onToggle(option.id)} />
          <span className={`badge badge-${option.badge ?? "Insumo"}`}>{option.badge ?? "Opcion"}</span>
          <strong>{option.id}</strong>
          <p>{option.text}</p>
          {option.meta && <small>{option.meta}</small>}
        </label>
      ))}
    </div>
  );
}

function StageFooter({
  stage,
  onValidate,
  onContinue,
}: {
  stage: StageState;
  onValidate: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="stage-footer">
      <span>Intento {stage.attempts + 1}</span>
      <button className="primary-button" onClick={onValidate}>
        <ClipboardCheck size={18} /> Validar respuestas
      </button>
      {stage.approved && (
        <button className="continue-button" onClick={onContinue}>
          Continuar <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
}

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <StageShell title="Simulador Cuna Mas" eyebrow="Planeamiento estrategico para contrataciones publicas" image={stageImages.welcome}>
      <div className="intro-layout">
        <div>
          <h2>Del PEI al requerimiento de contratacion</h2>
          <p>
            Practica la vinculacion entre el PEI 2024-2030 del MIDIS, el POI del Pliego MIDIS, la Unidad Ejecutora Cuna Mas, las actividades operativas, los insumos y la estrategia de contratacion publica.
          </p>
          <p>
            Cuna Mas no formula un PEI propio en este ejercicio: se articula al PEI del MIDIS y al POI mediante sus servicios de Cuidado Diurno y Acompanamiento a Familias.
          </p>
          <button className="primary-button wide" onClick={onStart}>
            Iniciar simulacion <ArrowRight size={18} />
          </button>
        </div>
        <MarcoConceptual />
      </div>
    </StageShell>
  );
}

function MarcoConceptual() {
  return (
    <div className="concept-panel">
      <h3>Marco conceptual</h3>
      <ul>
        <li>El PEI define objetivos estrategicos y acciones estrategicas.</li>
        <li>El POI implementa la estrategia mediante actividades operativas e inversiones.</li>
        <li>Las actividades operativas requieren insumos: bienes y servicios.</li>
        <li>El costeo y programacion de insumos conecta planeamiento, abastecimiento y contratacion publica.</li>
        <li>En servicios sociales criticos, la oportunidad de la contratacion es tan importante como la modalidad.</li>
      </ul>
    </div>
  );
}

function StageOEI({ state, dispatch }: { state: SimulatorState; dispatch: React.Dispatch<Action> }) {
  const stage = state.stages.oei;
  const correct = correctIds(oeiOptions);
  return (
    <StageShell title="Etapa 1: Objetivo Estrategico Institucional" eyebrow="Seleccion exacta - 20 puntos" image={stageImages.oei}>
      <StageInstruction icon={<Target />} text="Identifica el OEI del MIDIS relacionado directamente con los servicios misionales de Cuna Mas." />
      <OptionCards options={oeiOptions} selected={stage.selected} onToggle={(id) => dispatch({ type: "toggle", stage: "oei", id })} />
      <FeedbackPanel stage={stage} />
      <StageFooter
        stage={stage}
        onValidate={() => dispatch({ type: "validate", stage: "oei", correctIds: correct, messages: buildFeedback(oeiOptions, stage.selected, correct) })}
        onContinue={() => dispatch({ type: "goto", stage: "aei" })}
      />
    </StageShell>
  );
}

function StageAEI({ state, dispatch }: { state: SimulatorState; dispatch: React.Dispatch<Action> }) {
  const stage = state.stages.aei;
  const correct = correctIds(aeiOptions);
  return (
    <StageShell title="Etapa 2: Acciones Estrategicas Institucionales" eyebrow="Seleccion exacta - 20 puntos" image={stageImages.aei}>
      <StageInstruction icon={<Flag />} text="Elige las AEI que expresan los dos servicios principales de Cuna Mas: Cuidado Diurno y Acompanamiento a Familias." />
      <OptionCards options={aeiOptions} selected={stage.selected} onToggle={(id) => dispatch({ type: "toggle", stage: "aei", id })} />
      <FeedbackPanel stage={stage} />
      <StageFooter
        stage={stage}
        onValidate={() => dispatch({ type: "validate", stage: "aei", correctIds: correct, messages: buildFeedback(aeiOptions, stage.selected, correct) })}
        onContinue={() => dispatch({ type: "goto", stage: "activities" })}
      />
    </StageShell>
  );
}

function ActivityCards({ options, selected, onToggle }: { options: Activity[]; selected: string[]; onToggle: (id: string) => void }) {
  return (
    <div className="option-grid">
      {options.map((option) => (
        <label className={`option-card ${selected.includes(option.id) ? "selected" : ""}`} key={option.id}>
          <input type="checkbox" checked={selected.includes(option.id)} onChange={() => onToggle(option.id)} />
          <span className="badge badge-AO">AO</span>
          <strong>{option.id}</strong>
          <p>{option.text}</p>
          {option.annualCost !== undefined && option.annualGoal !== undefined && (
            <small>{option.unit} | Meta {new Intl.NumberFormat("es-PE").format(option.annualGoal)} | {formatMoney(option.annualCost)}</small>
          )}
        </label>
      ))}
    </div>
  );
}

function StageActivities({ state, dispatch }: { state: SimulatorState; dispatch: React.Dispatch<Action> }) {
  const stage = state.stages.activities;
  const correct = correctIds(activityOptions);
  return (
    <StageShell title="Etapa 3: Actividades operativas" eyebrow="Seleccion exacta - 25 puntos" image={stageImages.activities}>
      <CostSummary />
      <StageInstruction icon={<FileText />} text="Selecciona solo las actividades operativas de linea vinculadas a las AEI misionales de Cuna Mas." />
      <ActivityCards options={activityOptions} selected={stage.selected} onToggle={(id) => dispatch({ type: "toggle", stage: "activities", id })} />
      <FeedbackPanel stage={stage} />
      <StageFooter
        stage={stage}
        onValidate={() => dispatch({ type: "validate", stage: "activities", correctIds: correct, messages: buildFeedback(activityOptions, stage.selected, correct) })}
        onContinue={() => dispatch({ type: "goto", stage: "inputs" })}
      />
    </StageShell>
  );
}

function CostSummary() {
  return (
    <div className="cost-grid">
      {costCards.map((card) => (
        <div className="cost-card" key={card.label}>
          <span>{card.label}</span>
          <strong>{formatMoney(card.amount)}</strong>
        </div>
      ))}
    </div>
  );
}

function StageInputs({ state, dispatch }: { state: SimulatorState; dispatch: React.Dispatch<Action> }) {
  const stage = state.stages.inputs;
  const correct = correctIds(inputOptions);
  return (
    <StageShell title="Etapa 4: Insumos principales" eyebrow="Seleccion exacta - 20 puntos" image={stageImages.inputs}>
      <StageInstruction icon={<CheckCircle2 />} text="Relaciona las actividades criticas con sus insumos: servicios de actores comunales, alimentos, materiales, kits y formatos del servicio." />
      <OptionCards options={inputOptions} selected={stage.selected} onToggle={(id) => dispatch({ type: "toggle", stage: "inputs", id })} />
      <FeedbackPanel stage={stage} />
      <StageFooter
        stage={stage}
        onValidate={() => dispatch({ type: "validate", stage: "inputs", correctIds: correct, messages: buildFeedback(inputOptions, stage.selected, correct) })}
        onContinue={() => dispatch({ type: "goto", stage: "procurement" })}
      />
    </StageShell>
  );
}

function StageProcurement({ state, dispatch }: { state: SimulatorState; dispatch: React.Dispatch<Action> }) {
  const stage = state.stages.procurement;
  const correct = procurementCases.map((item) => `${item.id}:${item.correctIndex}`);
  const options: Option[] = procurementCases.flatMap((item) =>
    item.options.map((text, index) => ({
      id: `${item.id}:${index}`,
      text,
      correct: index === item.correctIndex,
      feedback: index === item.correctIndex ? item.feedback : "Revisa oportunidad, planificacion, agregacion de demanda, gestion de riesgos y evita fraccionamiento.",
    }))
  );
  return (
    <StageShell title="Etapa 5: Estrategia de contratacion publica" eyebrow="Seleccion exacta - 15 puntos" image={stageImages.procurement}>
      <div className="procurement-note">
        <p>
          Esta etapa usa una rubrica pedagogica general. No emite dictamen legal definitivo.
        </p>
        <a className="link-button" href="https://chatgpt.com/g/g-683160ac052c8191a4d08ba8a3bc5241-contrataciones-publicas" target="_blank" rel="noreferrer">
          Consultar GPT especializado en contrataciones publicas <ExternalLink size={16} />
        </a>
        <textarea
          value={state.gptRecommendation}
          onChange={(event) => dispatch({ type: "setGpt", text: event.target.value })}
          placeholder="Campo opcional: pega aqui la recomendacion del GPT especializado para contrastarla con la rubrica pedagogica."
        />
      </div>
      <div className="case-stack">
        {procurementCases.map((item) => (
          <div className="proc-case" key={item.id}>
            <span className="badge badge-Contratacion">Contratacion</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <div className="radio-list">
              {item.options.map((text, index) => (
                <label key={text} className={stage.selected.includes(`${item.id}:${index}`) ? "radio-option selected" : "radio-option"}>
                  <input
                    name={item.id}
                    type="radio"
                    checked={stage.selected.includes(`${item.id}:${index}`)}
                    onChange={() => dispatch({ type: "selectProc", id: item.id, answer: String(index) })}
                  />
                  <span>{String.fromCharCode(65 + index)}.</span>
                  {text}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <FeedbackPanel stage={stage} />
      <StageFooter
        stage={stage}
        onValidate={() => dispatch({ type: "validate", stage: "procurement", correctIds: correct, messages: buildFeedback(options, stage.selected, correct) })}
        onContinue={() => dispatch({ type: "goto", stage: "report" })}
      />
    </StageShell>
  );
}

function StageInstruction({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="instruction">
      {icon}
      <p>{text}</p>
    </div>
  );
}

function ProgressChart({ state }: { state: SimulatorState }) {
  const bars = [
    ["OEI", state.stages.oei.score, stageScores.oei],
    ["AEI", state.stages.aei.score, stageScores.aei],
    ["AO", state.stages.activities.score, stageScores.activities],
    ["Insumos", state.stages.inputs.score, stageScores.inputs],
    ["Contratacion", state.stages.procurement.score, stageScores.procurement],
  ] as const;
  return (
    <div className="chart">
      {bars.map(([label, score, max]) => (
        <div className="chart-row" key={label}>
          <span>{label}</span>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${(score / max) * 100}%` }} />
          </div>
          <strong>{score}/{max}</strong>
        </div>
      ))}
    </div>
  );
}

function FinalReport({ state, dispatch }: { state: SimulatorState; dispatch: React.Dispatch<Action> }) {
  const total = useMemo(() => Object.values(state.stages).reduce((sum, stage) => sum + stage.score, 0), [state.stages]);
  return (
    <StageShell title="Reporte final" eyebrow="Resumen de desempeno" image={stageImages.report}>
      <div className="report-grid">
        <div className="report-card main-result">
          <BarChart3 size={34} />
          <span>Puntaje total</span>
          <strong>{total}/100</strong>
          <p>{getLevel(total)}</p>
        </div>
        <div className="report-card">
          <h3>Desempeno por etapa</h3>
          <ProgressChart state={state} />
        </div>
        <div className="report-card">
          <h3>Intentos registrados</h3>
          <ul>
            <li>OEI: {state.stages.oei.attempts}</li>
            <li>AEI: {state.stages.aei.attempts}</li>
            <li>Actividades operativas: {state.stages.activities.attempts}</li>
            <li>Insumos: {state.stages.inputs.attempts}</li>
            <li>Contratacion: {state.stages.procurement.attempts}</li>
          </ul>
        </div>
        <div className="report-card">
          <h3>Errores frecuentes a vigilar</h3>
          <ul>
            <li>Confundir objetivos de gestion institucional con objetivos misionales.</li>
            <li>Confundir actividades de soporte administrativo con actividades de linea.</li>
            <li>Seleccionar insumos que no corresponden al servicio.</li>
            <li>Elegir contrataciones tardias o fragmentadas.</li>
          </ul>
        </div>
        <div className="report-card recommendation">
          <h3>Recomendacion final</h3>
          <p>Refuerza la cadena OEI &gt; AEI &gt; AO &gt; insumo &gt; contratacion.</p>
          <p>Recuerda que la contratacion publica debe programarse desde el POI, CMN y actuaciones preparatorias para asegurar oportunidad del servicio.</p>
        </div>
      </div>
      <div className="stage-footer">
        <button className="ghost-button" onClick={() => dispatch({ type: "reset" })}>
          <RefreshCcw size={17} /> Reiniciar simulacion
        </button>
      </div>
    </StageShell>
  );
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        dispatch({ type: "hydrate", state: JSON.parse(saved) as SimulatorState });
      } catch {
        localStorage.removeItem(storageKey);
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(storageKey, JSON.stringify(state));
  }, [loaded, state]);

  useEffect(() => {
    const reset = () => dispatch({ type: "reset" });
    window.addEventListener("reset-simulator", reset);
    return () => window.removeEventListener("reset-simulator", reset);
  }, []);

  const screen = {
    welcome: <WelcomeScreen onStart={() => dispatch({ type: "goto", stage: "oei" })} />,
    oei: <StageOEI state={state} dispatch={dispatch} />,
    aei: <StageAEI state={state} dispatch={dispatch} />,
    activities: <StageActivities state={state} dispatch={dispatch} />,
    inputs: <StageInputs state={state} dispatch={dispatch} />,
    procurement: <StageProcurement state={state} dispatch={dispatch} />,
    report: <FinalReport state={state} dispatch={dispatch} />,
  }[state.currentStage];

  return (
    <main>
      <ScoreBoard state={state} />
      {screen}
    </main>
  );
}
