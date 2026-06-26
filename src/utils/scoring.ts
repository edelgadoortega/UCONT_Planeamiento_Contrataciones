export type FeedbackKind =
  | "success"
  | "missing"
  | "incorrect"
  | "mixed"
  | "review";

export function isExactSelection(selectedIds: string[], correctIds: string[]) {
  if (selectedIds.length !== correctIds.length) return false;
  const selected = new Set(selectedIds);
  return correctIds.every((id) => selected.has(id));
}

export function getSelectionIssues(selectedIds: string[], correctIds: string[]) {
  const correct = new Set(correctIds);
  const selected = new Set(selectedIds);
  const missing = correctIds.filter((id) => !selected.has(id));
  const incorrect = selectedIds.filter((id) => !correct.has(id));
  return { missing, incorrect };
}

export function classifyFeedback(selectedIds: string[], correctIds: string[]): FeedbackKind {
  if (isExactSelection(selectedIds, correctIds)) return "success";
  const { missing, incorrect } = getSelectionIssues(selectedIds, correctIds);
  if (missing.length > 0 && incorrect.length > 0) return "mixed";
  if (missing.length > 0) return "missing";
  if (incorrect.length > 0) return "incorrect";
  return "review";
}

export function scoreStage(maxScore: number, failedAttempts: number) {
  const floor = maxScore * 0.5;
  return Math.max(floor, maxScore - failedAttempts * 2);
}

export function getLevel(total: number) {
  if (total >= 90) return "Dominio alto de la articulacion PEI-POI-contrataciones.";
  if (total >= 75) return "Buen desempeno, con oportunidades de mejora.";
  if (total >= 60) return "Desempeno basico, requiere reforzar articulacion estrategica.";
  return "Requiere repasar PEI, POI, costeo e insumos.";
}
