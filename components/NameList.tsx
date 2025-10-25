
import React from 'react';
import type { BusinessName } from '../types';

interface NameListProps {
  names: BusinessName[];
}

const NameList: React.FC<NameListProps> = ({ names }) => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-slate-300">Here are your generated names:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {names.map((item, index) => (
          <div 
            key={index} 
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 transition-all duration-300 hover:bg-slate-800 hover:border-purple-500 transform hover:-translate-y-1"
          >
            <h3 className="text-xl font-semibold text-purple-300">{item.name}</h3>
            <p className="text-slate-400 mt-1 italic">"{item.slogan}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NameList;
