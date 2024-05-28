export interface ICompleteTaskEvent {
  taskId: string;
  aggregateId: string;
  manualCreditCheckOutcome: string;
  manualRiskAssessmentOutcome: string;
}
