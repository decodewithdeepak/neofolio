import { motion } from 'framer-motion';

const CodeSnippet = ({
  isVisible = true,
  animationDelay = 0.8,
  filename = 'portfolio-showcase.jsx',
  className = 'mt-20',
}) => {
  return (
    <motion.div
      role="region"
      aria-label="Code Snippet"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
      transition={{ delay: animationDelay, duration: 0.8 }}
      className={`flex justify-center ${className}`}
    >
      <div className="relative max-w-4xl w-full rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm" />
        <div className="relative p-1 bg-gray-800/50 rounded-2xl border border-gray-700/50">
          {/* Editor Header */}
          <div className="flex items-center gap-1.5 px-4 py-2 border-b border-gray-700/30">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <div className="ml-4 text-xs text-gray-400">{filename}</div>
          </div>

          {/* Code Content */}
          <div className="p-4 overflow-x-auto font-mono text-xs sm:text-sm text-gray-300">
            <pre>
              <span className="text-blue-400">import</span>{' '}
              <span className="text-gray-300">&#123;</span>{' '}
              <span className="text-yellow-300">Portfolio</span>,{' '}
              <span className="text-yellow-300">Projects</span>{' '}
              <span className="text-gray-300">&#125;</span>{' '}
              <span className="text-blue-400">from</span>{' '}
              <span className="text-green-300">'neofolio/components'</span>;
              {'\n'}
              <span className="text-pink-400">// Your beautiful portfolio is just a few clicks away</span>
              {'\n'}
              <span className="text-pink-400">// We’ll write this code for you at our backend</span>
              {'\n'}
              <span className="text-blue-400">const</span>{' '}
              <span className="text-yellow-300">MyPortfolio</span>{' '}
              <span className="text-gray-300">= () =&gt; &#123;</span>
              {'\n  '}
              <span className="text-blue-400">return</span>{' '}
              <span className="text-gray-300">(</span>
              {'\n    '}
              <span className="text-gray-300">&lt;</span>
              <span className="text-yellow-300">Portfolio</span>
              {'\n      '}
              <span className="text-purple-400">theme</span>=
              <span className="text-green-300">"modern"</span>
              {'\n      '}
              <span className="text-purple-400">animation</span>=
              <span className="text-green-300">"fade"</span>
              {'\n      '}
              <span className="text-purple-400">showStats</span>=
              <span className="text-orange-400">&#123;true&#125;</span>
              <span className="text-gray-300">&gt;</span>
              {'\n      '}
              <span className="text-gray-300">&lt;</span>
              <span className="text-yellow-300">Projects</span>{' '}
              <span className="text-purple-400">featured</span>=
              <span className="text-orange-400">&#123;true&#125;</span>{' '}
              <span className="text-gray-300">/&gt;</span>
              {'\n    '}
              <span className="text-gray-300">&lt;/</span>
              <span className="text-yellow-300">Portfolio</span>
              <span className="text-gray-300">&gt;</span>
              {'\n  '}
              <span className="text-gray-300">);</span>
              {'\n'}
              <span className="text-gray-300">&#125;;</span>
            </pre>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CodeSnippet;