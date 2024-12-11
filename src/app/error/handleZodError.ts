import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  // let errorSources = err.issues.map((issue: ZodIssue) => {
  //   return err.issues.map((issue: ZodIssue) => ({
  //     path: issue?.path[issue.path.length - 1],
  //     message: issue.message,
  //   }));
  // });
  let errorSources = err.issues.map((issue: ZodIssue) => ({
    path: issue?.path[issue.path.length - 1] || "unknown",
    message: issue.message,
  }));
  const statusCode = 400;
  console.log(errorSources);
  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleZodError;
