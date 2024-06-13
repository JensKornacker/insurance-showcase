export interface CompleteTaskEvent {
  taskId: string;
  aggregateId: string;
  completeVars: object;
  manualCreditCheckOutcome: string;
  manualRiskAssessmentOutcome: string;
  taskDefinition: string;
}
