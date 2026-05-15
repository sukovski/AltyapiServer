import React, { useState } from 'react';
import { Plus, Trash2, Settings } from 'lucide-react';

const CLASSES = {
  WARRIOR: { name: 'Savaşçı', statBonus: { STR: 20, DEX: 10, VIT: 15, INT: 5 } },
  MAGE: { name: 'Büyücü', statBonus: { STR: 5, DEX: 10, VIT: 10, INT: 30 } },
  ASSASSIN: { name: 'Ninja', statBonus: { STR: 10, DEX: 25, VIT: 10, INT: 10 } },
  SURA: { name: 'Sura', statBonus: { STR: 20, DEX: 15, VIT: 12, INT: 18 } },
  SHAMAN: { name: 'Şaman', statBonus: { STR: 5, DEX: 5, VIT: 10, INT: 35 } },
};

const ITEM_SLOTS = {
  WEAPON: 'Silah',
  HEAD: 'Kask',
  BODY: 'Zırh',
  HAND: 'Eldive',
  FOOT: 'Çizme',
  NECK: 'Kolye',
  RING: 'Yüzük 1',
  RING2: 'Yüzük 2',
  SHIELD: 'Kalkan',
  BELT: 'Kemer',
};

const STAT_LIMITS = {
  STR: { min: 0, max: 120 },
  DEX: { min: 0, max: 120 },
  VIT: { min: 0, max: 120 },
  INT: { min: 0, max: 120 },
};

const DAMAGE_FORMULA = (attacker, defender) => {
  const atkAttr = attacker.stats.STR * 2 + attacker.equipment.atkBonus;
  const defAttr = defender.stats.VIT + defender.equipment.defBonus;
  
  const weaponDmg = attacker.equipment.weaponMin + 
                    Math.floor(Math.random() * (attacker.equipment.weaponMax - attacker.equipment.weaponMin + 1));
  
  const attackRating = (atkAttr * 1.5) / (Math.max(1, defAttr * 0.5));
  const damage = Math.max(0, Math.floor(weaponDmg * attackRating - defAttr * 0.3));
  
  return Math.max(1, damage);
};

export default function DamageSimulator() {
  const [attacker, setAttacker] = useState({
    name: 'Saldırgan',
    class: 'WARRIOR',
    level: 99,
    stats: { STR: 80, DEX: 50, VIT: 60, INT: 20 },
    equipment: {
      weaponMin: 20,
      weaponMax: 40,
      atkBonus: 100,
      defBonus: 0,
    },
    skills: { P: true, G1: false, M1: false },
  });

  const [defender, setDefender] = useState({
    name: 'Defender',
    class: 'WARRIOR',
    level: 99,
    stats: { STR: 60, DEX: 50, VIT: 80, INT: 20 },
    equipment: {
      weaponMin: 15,
      weaponMax: 30,
      atkBonus: 80,
      defBonus: 80,
    },
    skills: { P: true, G1: false, M1: false },
  });

  const [results, setResults] = useState(null);

  const updateStats = (character, stat, value) => {
    const char = character === 'attacker' ? attacker : defender;
    const newStats = {
      ...char.stats,
      [stat]: Math.min(STAT_LIMITS[stat].max, Math.max(STAT_LIMITS[stat].min, parseInt(value) || 0)),
    };
    const charObj = { ...char, stats: newStats };
    character === 'attacker' ? setAttacker(charObj) : setDefender(charObj);
  };

  const updateEquipment = (character, field, value) => {
    const char = character === 'attacker' ? attacker : defender;
    const newEquip = { ...char.equipment, [field]: parseInt(value) || 0 };
    const charObj = { ...char, equipment: newEquip };
    character === 'attacker' ? setAttacker(charObj) : setDefender(charObj);
  };

  const runSimulation = () => {
    const normalDamage = DAMAGE_FORMULA(attacker, defender);
    const skillDamage = attacker.skills.P ? Math.floor(normalDamage * 1.5) : normalDamage;
    const skillDamageG1 = attacker.skills.G1 ? Math.floor(normalDamage * 2.0) : normalDamage;
    const skillDamageM1 = attacker.skills.M1 ? Math.floor(normalDamage * 2.5) : normalDamage;

    const trials = 100;
    let totalNormal = 0, totalP = 0, totalG1 = 0, totalM1 = 0;

    for (let i = 0; i < trials; i++) {
      totalNormal += DAMAGE_FORMULA(attacker, defender);
      totalP += attacker.skills.P ? Math.floor(DAMAGE_FORMULA(attacker, defender) * 1.5) : DAMAGE_FORMULA(attacker, defender);
      totalG1 += attacker.skills.G1 ? Math.floor(DAMAGE_FORMULA(attacker, defender) * 2.0) : DAMAGE_FORMULA(attacker, defender);
      totalM1 += attacker.skills.M1 ? Math.floor(DAMAGE_FORMULA(attacker, defender) * 2.5) : DAMAGE_FORMULA(attacker, defender);
    }

    setResults({
      normal: Math.floor(totalNormal / trials),
      p: Math.floor(totalP / trials),
      g1: Math.floor(totalG1 / trials),
      m1: Math.floor(totalM1 / trials),
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-center">⚔️ Metin2 Hasar Simulatörü</h1>

      <div className="grid grid-cols-2 gap-8">
        {/* Saldırgan */}
        <div className="bg-slate-700 p-6 rounded-lg border-2 border-red-500">
          <h2 className="text-2xl font-bold mb-4">🔴 Saldırgan</h2>
          
          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-sm font-semibold">İsim</label>
              <input
                type="text"
                value={attacker.name}
                onChange={(e) => setAttacker({ ...attacker, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Sınıf</label>
              <select
                value={attacker.class}
                onChange={(e) => setAttacker({ ...attacker, class: e.target.value })}
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white"
              >
                {Object.entries(CLASSES).map(([k, v]) => (
                  <option key={k} value={k}>{v.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold">Seviye: {attacker.level}</label>
              <input
                type="range"
                min="1"
                max="120"
                value={attacker.level}
                onChange={(e) => setAttacker({ ...attacker, level: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          <div className="bg-slate-800 p-4 rounded mb-4">
            <h3 className="font-bold mb-3">İstatistikler</h3>
            {Object.entries(STAT_LIMITS).map(([stat]) => (
              <div key={stat} className="flex items-center gap-2 mb-2">
                <span className="w-12 font-bold text-amber-400">{stat}</span>
                <input
                  type="number"
                  min={STAT_LIMITS[stat].min}
                  max={STAT_LIMITS[stat].max}
                  value={attacker.stats[stat]}
                  onChange={(e) => updateStats('attacker', stat, e.target.value)}
                  className="flex-1 px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-center"
                />
              </div>
            ))}
          </div>

          <div className="bg-slate-800 p-4 rounded mb-4">
            <h3 className="font-bold mb-3">Ekipman</h3>
            <div className="space-y-2 text-sm">
              <div>
                <label>Silah Min Hasar</label>
                <input
                  type="number"
                  value={attacker.equipment.weaponMin}
                  onChange={(e) => updateEquipment('attacker', 'weaponMin', e.target.value)}
                  className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white"
                />
              </div>
              <div>
                <label>Silah Max Hasar</label>
                <input
                  type="number"
                  value={attacker.equipment.weaponMax}
                  onChange={(e) => updateEquipment('attacker', 'weaponMax', e.target.value)}
                  className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white"
                />
              </div>
              <div>
                <label>Saldırı Bonusu</label>
                <input
                  type="number"
                  value={attacker.equipment.atkBonus}
                  onChange={(e) => updateEquipment('attacker', 'atkBonus', e.target.value)}
                  className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-4 rounded">
            <h3 className="font-bold mb-3">Skilleri Seç</h3>
            <label className="flex items-center gap-2 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={attacker.skills.P}
                onChange={(e) => setAttacker({ ...attacker, skills: { ...attacker.skills, P: e.target.checked } })}
                className="w-4 h-4"
              />
              <span>P (Normal Vurus)</span>
            </label>
            <label className="flex items-center gap-2 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={attacker.skills.G1}
                onChange={(e) => setAttacker({ ...attacker, skills: { ...attacker.skills, G1: e.target.checked } })}
                className="w-4 h-4"
              />
              <span>G1 (Orta Skill)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={attacker.skills.M1}
                onChange={(e) => setAttacker({ ...attacker, skills: { ...attacker.skills, M1: e.target.checked } })}
                className="w-4 h-4"
              />
              <span>M1 (Güçlü Skill)</span>
            </label>
          </div>
        </div>

        {/* Defender */}
        <div className="bg-slate-700 p-6 rounded-lg border-2 border-blue-500">
          <h2 className="text-2xl font-bold mb-4">🔵 Savunucu</h2>
          
          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-sm font-semibold">İsim</label>
              <input
                type="text"
                value={defender.name}
                onChange={(e) => setDefender({ ...defender, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Sınıf</label>
              <select
                value={defender.class}
                onChange={(e) => setDefender({ ...defender, class: e.target.value })}
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white"
              >
                {Object.entries(CLASSES).map(([k, v]) => (
                  <option key={k} value={k}>{v.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold">Seviye: {defender.level}</label>
              <input
                type="range"
                min="1"
                max="120"
                value={defender.level}
                onChange={(e) => setDefender({ ...defender, level: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          <div className="bg-slate-800 p-4 rounded mb-4">
            <h3 className="font-bold mb-3">İstatistikler</h3>
            {Object.entries(STAT_LIMITS).map(([stat]) => (
              <div key={stat} className="flex items-center gap-2 mb-2">
                <span className="w-12 font-bold text-cyan-400">{stat}</span>
                <input
                  type="number"
                  min={STAT_LIMITS[stat].min}
                  max={STAT_LIMITS[stat].max}
                  value={defender.stats[stat]}
                  onChange={(e) => updateStats('defender', stat, e.target.value)}
                  className="flex-1 px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-center"
                />
              </div>
            ))}
          </div>

          <div className="bg-slate-800 p-4 rounded mb-4">
            <h3 className="font-bold mb-3">Ekipman</h3>
            <div className="space-y-2 text-sm">
              <div>
                <label>Silah Min Hasar</label>
                <input
                  type="number"
                  value={defender.equipment.weaponMin}
                  onChange={(e) => updateEquipment('defender', 'weaponMin', e.target.value)}
                  className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white"
                />
              </div>
              <div>
                <label>Silah Max Hasar</label>
                <input
                  type="number"
                  value={defender.equipment.weaponMax}
                  onChange={(e) => updateEquipment('defender', 'weaponMax', e.target.value)}
                  className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white"
                />
              </div>
              <div>
                <label>Savunma Bonusu</label>
                <input
                  type="number"
                  value={defender.equipment.defBonus}
                  onChange={(e) => updateEquipment('defender', 'defBonus', e.target.value)}
                  className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-4 rounded">
            <h3 className="font-bold mb-3">Skilleri Seç</h3>
            <label className="flex items-center gap-2 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={defender.skills.P}
                onChange={(e) => setDefender({ ...defender, skills: { ...defender.skills, P: e.target.checked } })}
                className="w-4 h-4"
              />
              <span>P (Normal Savunma)</span>
            </label>
            <label className="flex items-center gap-2 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={defender.skills.G1}
                onChange={(e) => setDefender({ ...defender, skills: { ...defender.skills, G1: e.target.checked } })}
                className="w-4 h-4"
              />
              <span>G1 (Orta Shield)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={defender.skills.M1}
                onChange={(e) => setDefender({ ...defender, skills: { ...defender.skills, M1: e.target.checked } })}
                className="w-4 h-4"
              />
              <span>M1 (Güçlü Shield)</span>
            </label>
          </div>
        </div>
      </div>

      <button
        onClick={runSimulation}
        className="w-full mt-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition"
      >
        ⚡ Hasar Simulasyonunu Çalıştır
      </button>

      {results && (
        <div className="mt-8 bg-slate-700 p-8 rounded-lg border-2 border-yellow-500">
          <h2 className="text-3xl font-bold mb-6 text-center">📊 Hasar Sonuçları</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-slate-800 p-6 rounded text-center">
              <div className="text-sm text-gray-400 mb-2">NORMAL VURUŞ</div>
              <div className="text-4xl font-bold text-yellow-400">{results.normal}</div>
              <div className="text-xs text-gray-500 mt-2">Ort. Hasar</div>
            </div>
            <div className="bg-slate-800 p-6 rounded text-center">
              <div className="text-sm text-gray-400 mb-2">P SKİLL</div>
              <div className="text-4xl font-bold text-cyan-400">{results.p}</div>
              <div className="text-xs text-gray-500 mt-2">x1.5 Çarpan</div>
            </div>
            <div className="bg-slate-800 p-6 rounded text-center">
              <div className="text-sm text-gray-400 mb-2">G1 SKİLL</div>
              <div className="text-4xl font-bold text-orange-400">{results.g1}</div>
              <div className="text-xs text-gray-500 mt-2">x2.0 Çarpan</div>
            </div>
            <div className="bg-slate-800 p-6 rounded text-center">
              <div className="text-sm text-gray-400 mb-2">M1 SKİLL</div>
              <div className="text-4xl font-bold text-red-400">{results.m1}</div>
              <div className="text-xs text-gray-500 mt-2">x2.5 Çarpan</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-800 rounded text-sm text-gray-300">
            <p className="mb-2"><strong>{attacker.name}</strong> vs <strong>{defender.name}</strong></p>
            <p>Formül: Hasar = (Silah × Saldırı Oranı) - Savunma</p>
            <p className="text-xs text-gray-500 mt-2">100 denemeden ortalama değerler gösterilmektedir.</p>
          </div>
        </div>
      )}
    </div>
  );
}
