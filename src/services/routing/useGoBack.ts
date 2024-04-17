interface GoBackAPI {
  goBack(): void;
  canGoBack: boolean;
  getCanGoBack(delta: number): boolean;
}

const useGoBack = (delta: number = 1): GoBackAPI => {
  const canGoBack = window.history.length > delta;

  return {
    goBack() {
      if (canGoBack) {
        window.history.go(-delta);
      }
    },
    canGoBack,
    getCanGoBack(delta) {
      return window.history.length > delta;
    },
  };
};

export default useGoBack;
