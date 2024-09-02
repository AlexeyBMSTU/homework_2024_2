'use strict';
// Пояснение записи:
// Эта строка включает строгий режим
// В строгом режиме код выполняется с ограничениями, 
// которые помогают предотвратить распространенные ошибки и улучшить качество кода

// Использование рест для больших объектов может быть неэффективным 
// из-за затрат на производительность и память
// По сути тут у меня рекурсия. и рекурсия ограничена на глубину, т.е.
// Стек переполниться не сможет. Если использовать рекурсию, то только с условием выхода из нее

const plainify = (obj, prefix = '', maxDepth = 1000) => {
  // Проверяем, что obj является объектом
  if (typeof obj !== 'object' || obj === null) {
    return {};    
  }

  // Проверяем, что prefix является строкой
  if (typeof prefix !== 'string') {
    throw new Error('Префикс должен быть строкой');
  }

  const result = {};
  const stack = [{ obj, prefix, depth: 0 }];

  while (stack.length > 0) {
    const { obj: currentObject, prefix: currentPrefix, depth } = stack.pop();

    // Условие выхода из цикла
    if (depth > maxDepth) {
      throw new Error('Объект слишком глубоко вложен. Максимальная глубина: ${maxDepth}');
    }
    // Используем Object.entries для итерации по ключ-значению объекта (хеш)
    for (const [key, value] of Object.entries(currentObject)) {
      // Создаем новый ключ, конкатенируя префикс и оригинальный ключ
      const newKey = currentPrefix ? `${currentPrefix}.${key}` : key;

      // Проверяем, что value является объектом и не является null или массивом
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        stack.push({ obj: value, prefix: newKey, depth: depth + 1});
      } else {
        result[newKey] = value;
      }
    }
  }

  return result;
};
