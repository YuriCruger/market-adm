type ErrorProps = {
  error: string | undefined;
};

export function Error({ error }: ErrorProps) {
  return (
    <div className="mt-1 min-h-[1rem]">
      <span className="text-xs text-red-500">{error}</span>
    </div>
  );
}
