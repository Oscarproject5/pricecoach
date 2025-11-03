'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('other');
  const [loading, setLoading] = useState(false);

  const startSession = async () => {
    if (!businessName.trim()) {
      alert('Please enter your business name');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/session/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, industry }),
      });

      const data = await response.json();

      if (data.sessionId) {
        router.push(`/chat?session=${data.sessionId}`);
      }
    } catch (error) {
      console.error('Failed to start session:', error);
      alert('Failed to start session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            💰 Price Coach
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Smart Pricing Strategy & Business Coach
          </p>
          <p className="text-gray-500">
            Get expert guidance on pricing, identify what's really holding your business back,
            and create actionable solutions together.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Name
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your business name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="other">Select your industry...</option>
              <option value="saas">SaaS / Software</option>
              <option value="services">Professional Services / Consulting</option>
              <option value="restaurant">Restaurant / Food Service</option>
              <option value="retail">Retail</option>
              <option value="ecommerce">E-commerce</option>
              <option value="manufacturing">Manufacturing</option>
            </select>
          </div>

          <button
            onClick={startSession}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Starting Session...' : 'Start Coaching Session →'}
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">What to Expect:</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Deep-dive questions to understand your business situation</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Identify if pricing is the problem - or something else</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Real calculations using your actual numbers</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Co-create actionable solutions together</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Get framing for customers and implementation steps</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
