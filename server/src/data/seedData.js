export const champions = [
  { id: 'ahri', name: 'Ahri', cost: 4, traits: ['Star Guardian', 'Sorcerer'], ability: 'ปล่อยคลื่นพลังใส่ศัตรูหลายเป้าหมาย', role: 'AP Carry', recommendedItems: ['Spear of Shojin', 'Jeweled Gauntlet'] },
  { id: 'garen', name: 'Garen', cost: 4, traits: ['Demacia', 'Juggernaut'], ability: 'สร้างเกราะและฟันศัตรูด้านหน้า', role: 'Frontline', recommendedItems: ["Warmog's Armor", 'Bramble Vest'] },
  { id: 'jinx', name: 'Jinx', cost: 3, traits: ['Zaun', 'Gunner'], ability: 'ยิงจรวดสร้างความเสียหายเป็นวงกว้าง', role: 'AD Carry', recommendedItems: ['Infinity Edge', 'Last Whisper'] },
  { id: 'leona', name: 'Leona', cost: 5, traits: ['Targon', 'Bastion'], ability: 'เรียกโล่แสงและยั่วยุศัตรู', role: 'Main Tank', recommendedItems: ["Warmog's Armor", 'Gargoyle Enchant'] },
  { id: 'sona', name: 'Sona', cost: 2, traits: ['Star Guardian', 'Invoker'], ability: 'รักษาเพื่อนและเพิ่มความเร็วโจมตี', role: 'Support', recommendedItems: ['Spear of Shojin', 'Archangel Staff'] },
  { id: 'zed', name: 'Zed', cost: 2, traits: ['Ionia', 'Assassin'], ability: 'กระโดดไปด้านหลังและโจมตีเป้าหมายที่อ่อนแอ', role: 'AD Carry', recommendedItems: ['Infinity Edge', 'Bloodthirster'] }
];

export const traits = [
  { id: 'star-guardian', name: 'Star Guardian', description: 'ได้รับมานาเพิ่มและเสริมพลังให้ทีมเมื่อร่ายสกิล', thresholds: [{ count: 3, bonus: '+15% Mana' }, { count: 5, bonus: '+35% Mana และ Heal' }], champions: ['Ahri', 'Sona'] },
  { id: 'demacia', name: 'Demacia', description: 'แนวหน้ามีเกราะและต้านทานเวทเพิ่มขึ้น', thresholds: [{ count: 2, bonus: '+20 Armor/MR' }, { count: 4, bonus: '+45 Armor/MR' }], champions: ['Garen'] },
  { id: 'gunner', name: 'Gunner', description: 'ทุกการโจมตีเพิ่มความเสียหายสะสม', thresholds: [{ count: 2, bonus: '+10% AD' }, { count: 4, bonus: '+35% AD' }], champions: ['Jinx'] },
  { id: 'bastion', name: 'Bastion', description: 'ได้รับเกราะและต้านทานเวท โดยแนวหน้าได้มากเป็นพิเศษ', thresholds: [{ count: 2, bonus: '+20 Armor/MR' }, { count: 4, bonus: '+50 Armor/MR' }], champions: ['Leona'] }
];

export const items = [
  { id: 'infinity-edge', name: 'Infinity Edge', stats: '+35% Critical Strike', recipe: ['B.F. Sword', 'Sparring Gloves'], champions: ['Jinx', 'Zed'], tip: 'เหมาะกับแครี่กายภาพที่ต้องการระเบิดดาเมจ' },
  { id: 'warmogs-armor', name: "Warmog's Armor", stats: '+600 Health', recipe: ['Giant Belt', 'Giant Belt'], champions: ['Garen', 'Leona'], tip: 'ใส่ให้แทงค์หลักเพื่อยืนได้นานขึ้น' },
  { id: 'spear-of-shojin', name: 'Spear of Shojin', stats: '+15 AD, +15 AP, +15 Mana', recipe: ['B.F. Sword', 'Tear of the Goddess'], champions: ['Ahri', 'Sona'], tip: 'ช่วยให้แครี่ร่ายสกิลได้ถี่ขึ้น' }
];

export const teamComps = [
  { id: 'star-guardian-core', name: 'Star Guardian Core', difficulty: 'กลาง', champions: ['Ahri', 'Sona', 'Leona', 'Garen'], traits: ['Star Guardian', 'Bastion'], score: 86, description: 'ทีมเวทที่มีแนวหน้าแข็งแรงและเล่นรอบการร่ายสกิล' },
  { id: 'zaun-gunner', name: 'Zaun Gunner', difficulty: 'ง่าย', champions: ['Jinx', 'Zed', 'Garen'], traits: ['Gunner', 'Demacia'], score: 81, description: 'ทีมกายภาพที่เริ่มต้นง่ายและสเกลดีช่วงกลางเกม' }
];

export const guides = [
  { id: 'what-is-tft', order: 1, title: 'TFT คืออะไร', category: 'พื้นฐาน', content: 'เกมวางแผนอัตโนมัติที่คุณซื้อยูนิต จัดทีม บริหารทอง และต่อสู้กับผู้เล่นอื่น' },
  { id: 'economy', order: 2, title: 'Gold และ Interest', category: 'พื้นฐาน', content: 'เก็บทองทุก 10 จะได้ดอกเบี้ยเพิ่ม แต่ต้องแลกกับพลังของกระดาน' },
  { id: 'leveling', order: 3, title: 'การเพิ่ม Level', category: 'กลยุทธ์', content: 'เลเวลสูงทำให้ใส่ยูนิตได้มากขึ้นและเพิ่มโอกาสเจอยูนิต Cost สูง' },
  { id: 'reroll', order: 4, title: 'การ Reroll', category: 'กลยุทธ์', content: 'ใช้ทองค้นหาร้านใหม่เมื่อถึงจังหวะที่ต้องการอัปเกรดยูนิตหลัก' },
  { id: 'augments', order: 5, title: 'การเลือก Augment', category: 'กลยุทธ์', content: 'เลือก Augment ที่เสริมแผนปัจจุบันและช่วยแก้จุดอ่อนของกระดาน' },
  { id: 'positioning', order: 6, title: 'การจัดตำแหน่ง', category: 'ขั้นสูง', content: 'วางแทงค์รับดาเมจด้านหน้าและซ่อนแครี่จากภัยคุกคามของคู่แข่ง' }
];
