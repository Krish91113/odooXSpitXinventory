import React from 'react';

const TestFont = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-8">
        
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-gray-900 mb-4">
            Zodiak Font Test
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Testing all font weights
          </p>
        </div>

        <div className="space-y-6">
          {/* Thin */}
          <div className="p-4 border-b border-gray-200">
            <p className="text-xs text-gray-500 mb-2 font-medium">THIN (100)</p>
            <h2 className="text-4xl font-thin text-gray-900">
              The quick brown fox jumps over the lazy dog
            </h2>
          </div>

          {/* Light */}
          <div className="p-4 border-b border-gray-200">
            <p className="text-xs text-gray-500 mb-2 font-medium">LIGHT (300)</p>
            <h2 className="text-4xl font-light text-gray-900">
              The quick brown fox jumps over the lazy dog
            </h2>
          </div>

          {/* Regular */}
          <div className="p-4 border-b border-gray-200">
            <p className="text-xs text-gray-500 mb-2 font-medium">REGULAR (400)</p>
            <h2 className="text-4xl font-normal text-gray-900">
              The quick brown fox jumps over the lazy dog
            </h2>
          </div>

          {/* Medium */}
          <div className="p-4 border-b border-gray-200">
            <p className="text-xs text-gray-500 mb-2 font-medium">MEDIUM (500)</p>
            <h2 className="text-4xl font-medium text-gray-900">
              The quick brown fox jumps over the lazy dog
            </h2>
          </div>

          {/* SemiBold */}
          <div className="p-4 border-b border-gray-200">
            <p className="text-xs text-gray-500 mb-2 font-medium">SEMIBOLD (600)</p>
            <h2 className="text-4xl font-semibold text-gray-900">
              The quick brown fox jumps over the lazy dog
            </h2>
          </div>

          {/* Bold */}
          <div className="p-4 border-b border-gray-200">
            <p className="text-xs text-gray-500 mb-2 font-medium">BOLD (700)</p>
            <h2 className="text-4xl font-bold text-gray-900">
              The quick brown fox jumps over the lazy dog
            </h2>
          </div>

          {/* Black */}
          <div className="p-4">
            <p className="text-xs text-gray-500 mb-2 font-medium">BLACK (900)</p>
            <h2 className="text-4xl font-black text-gray-900">
              The quick brown fox jumps over the lazy dog
            </h2>
          </div>
        </div>

        {/* Sample Card */}
        <div className="mt-12 p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-white">
          <h1 className="text-5xl font-black mb-4">StockMaster</h1>
          <p className="text-2xl font-light mb-6 text-gray-300">
            Inventory Management, Reimagined.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition">
              Get Started
            </button>
            <button className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Typography Scale */}
        <div className="mt-12 p-8 bg-gray-50 rounded-2xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Typography Scale</h2>
          <div className="space-y-3">
            <h1 className="text-6xl font-black text-gray-900">Heading 1</h1>
            <h2 className="text-5xl font-bold text-gray-800">Heading 2</h2>
            <h3 className="text-4xl font-semibold text-gray-700">Heading 3</h3>
            <h4 className="text-3xl font-medium text-gray-600">Heading 4</h4>
            <p className="text-xl font-normal text-gray-600">Body Large</p>
            <p className="text-base font-light text-gray-500">Body Regular</p>
            <p className="text-sm font-light text-gray-400">Body Small</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TestFont;