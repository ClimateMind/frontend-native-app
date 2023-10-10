function useLogger() {
  function logError(error: string) {
    console.log(error);
  }

  return {
    logError,
  };
}

export default useLogger;
