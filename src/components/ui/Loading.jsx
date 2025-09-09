import { motion } from "framer-motion";

const Loading = ({ type = "page", className = "" }) => {
  if (type === "table") {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 py-3">
            <div className="col-span-3 h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded shimmer" />
            <div className="col-span-2 h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded shimmer" />
            <div className="col-span-2 h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded shimmer" />
            <div className="col-span-2 h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded shimmer" />
            <div className="col-span-3 h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded shimmer" />
          </div>
        ))}
      </div>
    );
  }

  if (type === "grid") {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-slate-200 to-slate-300 shimmer" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded shimmer" />
              <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-2/3 shimmer" />
              <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-1/3 shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "stats") {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ${className}`}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-1/2 shimmer" />
                <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-3/4 shimmer" />
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`flex items-center justify-center min-h-[400px] ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="absolute inset-0 w-12 h-12 border-4 border-primary/20 rounded-full mx-auto" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-32 mx-auto shimmer" />
          <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-24 mx-auto shimmer" />
        </div>
      </div>
    </motion.div>
  );
};

export default Loading;