export const parseTasksFromText = (text: string): string[] => {
  if (!text || !text.trim()) return [];

  // Split by common separators: "and", "then", commas, semicolons
  const separators = /\band\b|\bthen\b|,|;/gi;
  
  const potentialTasks = text.split(separators);
  
  const tasks = potentialTasks
    .map(task => task.trim())
    .filter(task => task.length > 2)
    .map(task => {
      // Capitalize first letter
      return task.charAt(0).toUpperCase() + task.slice(1);
    });

  return tasks.length > 0 ? tasks : [text.trim()];
};
