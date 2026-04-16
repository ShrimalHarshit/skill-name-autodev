// js/app.js
// Main application logic for skill_name project

import { Storage } from './storage.js';

class SkillGenerator {
  constructor() {
    this.skills = [];
    this.init();
  }

  init() {
    this.loadSkills();
    this.bindEvents();
    this.renderSkills();
  }

  loadSkills() {
    this.skills = Storage.getSkills();
  }

  bindEvents() {
    document.getElementById('generateBtn').addEventListener('click', () => this.generateSkill());
    document.getElementById('filterInput').addEventListener('input', (e) => this.filterSkills(e.target.value));
    document.getElementById('ratingFilter').addEventListener('change', (e) => this.filterByRating(e.target.value));
  }

  generateSkill() {
    const goalInput = document.getElementById('goalInput');
    const goal = goalInput.value.trim();

    if (!goal) {
      this.showMessage('Please enter a goal', 'error');
      return;
    }

    const prompt = this.generatePrompt(goal);
    const executionLogic = this.generateExecutionLogic(goal);
    const testCases = this.generateTestCases(goal);

    const skill = {
      id: Storage.getNextId(),
      goal,
      prompt,
      executionLogic,
      testCases,
      rating: 0
    };

    Storage.saveSkill(skill);
    this.skills.push(skill);
    this.renderSkills();
    goalInput.value = '';
    this.showMessage('Skill generated successfully!', 'success');
  }

  generatePrompt(goal) {
    return `You are an AI assistant. Your task is to ${goal}. Please provide a detailed response based on the user's input.`;
  }

  generateExecutionLogic(goal) {
    return `// Execution logic for: ${goal}
function execute(input) {
  // Implement logic here
  return input;
}`;
  }

  generateTestCases(goal) {
    return [
      {
        description: `Basic test case for ${goal}`,
        input: 'Sample input',
        expectedOutput: 'Expected output'
      }
    ];
  }

  renderSkills() {
    const skillsContainer = document.getElementById('skillsContainer');
    skillsContainer.innerHTML = '';

    this.skills.forEach(skill => {
      const skillElement = this.createSkillElement(skill);
      skillsContainer.appendChild(skillElement);
    });
  }

  createSkillElement(skill) {
    const div = document.createElement('div');
    div.className = 'skill-card';
    div.innerHTML = `
      <h3>${skill.goal}</h3>
      <p><strong>Prompt:</strong> ${skill.prompt}</p>
      <p><strong>Execution Logic:</strong></p>
      <pre><code>${skill.executionLogic}</code></pre>
      <p><strong>Test Cases:</strong></p>
      <ul>
        ${skill.testCases.map(tc => `<li>${tc.description}: ${tc.input} → ${tc.expectedOutput}</li>`).join('')}
      </ul>
      <div class="rating">
        <label>Rating:</label>
        <select data-skill-id="${skill.id}">
          <option value="0" ${skill.rating === 0 ? 'selected' : ''}>0</option>
          <option value="1" ${skill.rating === 1 ? 'selected' : ''}>1</option>
          <option value="2" ${skill.rating === 2 ? 'selected' : ''}>2</option>
          <option value="3" ${skill.rating === 3 ? 'selected' : ''}>3</option>
          <option value="4" ${skill.rating === 4 ? 'selected' : ''}>4</option>
          <option value="5" ${skill.rating === 5 ? 'selected' : ''}>5</option>
        </select>
      </div>
      <button class="delete-btn" data-skill-id="${skill.id}">Delete</button>
    `;

    div.querySelector('select').addEventListener('change', (e) => this.updateRating(skill.id, parseInt(e.target.value, 10)));
    div.querySelector('.delete-btn').addEventListener('click', () => this.deleteSkill(skill.id));

    return div;
  }

  updateRating(skillId, rating) {
    const skill = this.skills.find(s => s.id === skillId);
    if (skill) {
      skill.rating = rating;
      Storage.saveSkill(skill);
      this.showMessage('Rating updated!', 'success');
    }
  }

  deleteSkill(skillId) {
    this.skills = this.skills.filter(s => s.id !== skillId);
    Storage.deleteSkill(skillId);
    this.renderSkills();
    this.showMessage('Skill deleted!', 'success');
  }

  filterSkills(query) {
    const filtered = this.skills.filter(skill => 
      skill.goal.toLowerCase().includes(query.toLowerCase()) ||
      skill.prompt.toLowerCase().includes(query.toLowerCase())
    );
    this.renderFilteredSkills(filtered);
  }

  filterByRating(rating) {
    if (rating === 'all') {
      this.renderSkills();
    } else {
      const filtered = this.skills.filter(skill => skill.rating >= parseInt(rating, 10));
      this.renderFilteredSkills(filtered);
    }
  }

  renderFilteredSkills(skills) {
    const skillsContainer = document.getElementById('skillsContainer');
    skillsContainer.innerHTML = '';

    skills.forEach(skill => {
      const skillElement = this.createSkillElement(skill);
      skillsContainer.appendChild(skillElement);
    });
  }

  showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
      document.body.removeChild(messageDiv);
    }, 3000);
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SkillGenerator();
});