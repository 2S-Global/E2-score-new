import { Suspense } from "react";
import InterviewResponseClient from "../../components/interview-success";

export default function InterviewResponsePage() {
  return (
    <Suspense
      fallback={
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      }
    >
      <InterviewResponseClient />
    </Suspense>
  );
}
