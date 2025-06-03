export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-gray-300 relative overflow-hidden rounded-md ${className}`}
    >
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-70" />
    </div>
  );
}