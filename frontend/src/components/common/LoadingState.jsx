const LoadingState = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

      <p className="mt-4 text-sm text-slate-500">
        {message}
      </p>
    </div>
  );
};

export default LoadingState;