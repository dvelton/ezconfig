let vehiclesData = null;
let activeCategory = null;
let quizAnswers = {};
let promptCache = {};

async function init() {
    try {
        const resp = await fetch('vehicles.json');
        vehiclesData = await resp.json();
        renderFilterPills();
        renderCatalog();
    } catch (e) {
        document.getElementById('catalog-grid').innerHTML =
            '<p style="color: var(--text-muted); text-align: center;">Could not load vehicles.json</p>';
    }
}

// --- Navigation ---

function scrollToQuiz() {
    document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
}

function scrollToCatalog() {
    document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
}

// --- Quiz ---

function quizSelect(step, value) {
    quizAnswers[step] = value;

    // highlight selected
    const stepEl = document.getElementById('quiz-step-' + step);
    stepEl.querySelectorAll('.quiz-option').forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');

    setTimeout(() => {
        stepEl.classList.remove('active');
        if (step < 3) {
            document.getElementById('quiz-step-' + (step + 1)).classList.add('active');
        } else {
            showQuizResults();
        }
    }, 200);
}

function showQuizResults() {
    const results = getQuizRecommendations(quizAnswers);
    const container = document.getElementById('quiz-results-list');

    if (results.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No exact matches — try browsing the full catalog below.</p>';
    } else {
        container.innerHTML = results.map(v => renderVehicleCard(v)).join('');
    }

    document.getElementById('quiz-results').classList.add('active');
}

function resetQuiz() {
    quizAnswers = {};
    document.querySelectorAll('.quiz-step').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.quiz-option').forEach(btn => btn.classList.remove('selected'));
    document.getElementById('quiz-step-1').classList.add('active');
}

function getQuizRecommendations(answers) {
    if (!vehiclesData) return [];

    const allVehicles = vehiclesData.categories.flatMap(c =>
        c.vehicles.map(v => ({ ...v, categoryId: c.id, categoryLabel: c.label }))
    );

    // scoring
    return allVehicles
        .map(v => {
            let score = 0;

            // Step 1: what did you build?
            if (answers[1] === 'website') {
                if (['share-website', 'real-backend'].includes(v.categoryId)) score += 3;
                if (v.categoryId === 'mobile' && v.id === 'pwa') score += 2;
            } else if (answers[1] === 'script') {
                if (['cli-distribution', 'desktop-app'].includes(v.categoryId)) score += 3;
                if (v.categoryId === 'automate') score += 1;
            } else if (answers[1] === 'data') {
                if (v.categoryId === 'share-data') score += 3;
                if (v.categoryId === 'real-backend') score += 1;
                if (v.categoryId === 'workplace-tools') score += 1;
            } else if (answers[1] === 'automation') {
                if (v.categoryId === 'automate') score += 3;
                if (v.categoryId === 'bots') score += 1;
            } else if (answers[1] === 'unsure') {
                score += 1;
            }

            // Step 2: what do you want to do with it?
            if (answers[2] === 'share-web') {
                if (['share-website', 'real-backend'].includes(v.categoryId)) score += 3;
            } else if (answers[2] === 'share-app') {
                if (['desktop-app', 'mobile'].includes(v.categoryId)) score += 3;
            } else if (answers[2] === 'share-team') {
                if (['bots', 'workplace-tools'].includes(v.categoryId)) score += 3;
            } else if (answers[2] === 'automate') {
                if (v.categoryId === 'automate') score += 3;
            } else if (answers[2] === 'extend') {
                if (['extend-tools', 'browser-extension'].includes(v.categoryId)) score += 3;
            } else if (answers[2] === 'distribute') {
                if (v.categoryId === 'cli-distribution') score += 3;
                if (v.categoryId === 'share-website') score += 1;
            }

            // Step 3: complexity tolerance
            if (answers[3] === 'minimal') {
                if (v.complexity === 'very-low') score += 3;
                if (v.complexity === 'low') score += 2;
                if (v.complexity === 'medium') score += 0;
                if (v.complexity === 'high') score -= 2;
            } else if (answers[3] === 'moderate') {
                if (v.complexity === 'very-low') score += 1;
                if (v.complexity === 'low') score += 2;
                if (v.complexity === 'medium') score += 2;
            }
            // 'whatever' doesn't penalize any complexity

            return { ...v, score };
        })
        .filter(v => v.score > 3)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
}

// --- Catalog ---

function renderFilterPills() {
    if (!vehiclesData) return;
    const container = document.getElementById('filter-pills');
    const pills = [{ id: null, label: 'All' }]
        .concat(vehiclesData.categories.map(c => ({ id: c.id, label: c.icon + ' ' + c.label })));

    container.innerHTML = pills.map(p =>
        `<button class="filter-pill${p.id === activeCategory ? ' active' : ''}" onclick="setCategory(${p.id ? "'" + p.id + "'" : 'null'})">${p.label}</button>`
    ).join('');
}

function setCategory(catId) {
    activeCategory = catId;
    renderFilterPills();
    filterCatalog();
}

function filterCatalog() {
    const search = document.getElementById('search-input').value.toLowerCase().trim();
    renderCatalog(search);
}

function renderCatalog(search) {
    if (!vehiclesData) return;
    const grid = document.getElementById('catalog-grid');
    let html = '';

    for (const cat of vehiclesData.categories) {
        if (activeCategory && cat.id !== activeCategory) continue;

        const filtered = cat.vehicles.filter(v => {
            if (!search) return true;
            return v.name.toLowerCase().includes(search)
                || v.description.toLowerCase().includes(search)
                || v.bestFor.toLowerCase().includes(search)
                || (v.tags && v.tags.some(t => t.includes(search)));
        });

        if (filtered.length === 0) continue;

        html += `<div class="category-group">
            <div class="category-header">
                <span class="category-icon">${cat.icon}</span>
                <span class="category-label">${cat.label}</span>
                <span class="category-count">${filtered.length} vehicle${filtered.length !== 1 ? 's' : ''}</span>
            </div>
            <div class="vehicles-grid">
                ${filtered.map(v => renderVehicleCard(v)).join('')}
            </div>
        </div>`;
    }

    if (!html) {
        html = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No vehicles match your search.</p>';
    }

    grid.innerHTML = html;
}

function renderVehicleCard(v) {
    const costClass = (v.cost === 'free' || v.cost === 'free-tier') ? 'badge-cost' : 'badge-cost-paid';
    const costLabel = v.cost === 'free' ? 'Free' : v.cost === 'free-tier' ? 'Free tier' : v.cost === 'freemium' ? 'Freemium' : 'Paid';
    const complexityLabel = v.complexity.replace('-', ' ');
    const complexityClass = 'badge-complexity-' + v.complexity;

    return `<div class="vehicle-card" onclick="openModal('${v.id}')">
        <div class="vehicle-name">${v.name}</div>
        <div class="vehicle-description">${v.description}</div>
        <div class="vehicle-meta">
            <span class="badge ${costClass}">${costLabel}</span>
            <span class="badge ${complexityClass}">${complexityLabel}</span>
        </div>
    </div>`;
}

// --- Modal ---

function findVehicle(id) {
    for (const cat of vehiclesData.categories) {
        const v = cat.vehicles.find(v => v.id === id);
        if (v) return { ...v, categoryLabel: cat.label, categoryIcon: cat.icon };
    }
    return null;
}

async function openModal(vehicleId) {
    const v = findVehicle(vehicleId);
    if (!v) return;

    const costLabel = v.cost === 'free' ? 'Free' : v.cost === 'free-tier' ? 'Free tier' : v.cost === 'freemium' ? 'Freemium' : 'Paid';
    const complexityLabel = v.complexity.replace(/-/g, ' ');
    complexityLabel[0] && (complexityLabel.charAt(0).toUpperCase() + complexityLabel.slice(1));

    let exampleHtml = '';
    if (v.example) {
        exampleHtml = `<div class="example-box">
            <h4>Real Example</h4>
            <p><strong>${v.example.name}</strong></p>
            ${v.example.url ? `<p><a href="${v.example.url}" target="_blank">${v.example.url}</a></p>` : ''}
            ${v.example.repo ? `<p><a href="${v.example.repo}" target="_blank">View source</a></p>` : ''}
            ${v.example.note ? `<p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem;">${v.example.note}</p>` : ''}
        </div>`;
    }

    let promptHtml = '';
    if (v.promptTemplate) {
        const promptContent = await loadPrompt(v.promptTemplate);
        if (promptContent) {
            promptHtml = `<div class="prompt-section">
                <h4>Copy-Paste Prompt</h4>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.75rem;">
                    Paste this into any AI tool (Copilot CLI, ChatGPT, Claude, Cursor, etc.) to get started.
                </p>
                <button class="copy-prompt-btn" onclick="copyPrompt(this, '${v.promptTemplate}')">Copy prompt to clipboard</button>
                <div class="prompt-preview">${escapeHtml(promptContent)}</div>
            </div>`;
        }
    }

    document.getElementById('modal-content').innerHTML = `
        <h3>${v.name}</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1rem;">${v.categoryIcon} ${v.categoryLabel}</p>
        <p class="vehicle-full-description">${v.description}</p>
        <div class="detail-row"><span class="detail-label">Cost</span><span class="detail-value">${costLabel}${v.costDetail ? ' — ' + v.costDetail : ''}</span></div>
        <div class="detail-row"><span class="detail-label">Complexity</span><span class="detail-value">${capitalize(complexityLabel)}</span></div>
        <div class="detail-row"><span class="detail-label">Best for</span><span class="detail-value">${v.bestFor}</span></div>
        <div class="detail-row"><span class="detail-label">Platform</span><span class="detail-value">${v.platform.join(', ')}</span></div>
        ${exampleHtml}
        ${promptHtml}
    `;

    document.getElementById('modal-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

async function loadPrompt(templateId) {
    if (promptCache[templateId]) return promptCache[templateId];
    try {
        const resp = await fetch(`prompts/${templateId}.md`);
        if (!resp.ok) return null;
        let text = await resp.text();
        // Strip the title and intro — just get the prompt after the ---
        const parts = text.split('---');
        if (parts.length >= 3) {
            text = parts.slice(2).join('---').trim();
        } else if (parts.length === 2) {
            text = parts[1].trim();
        }
        promptCache[templateId] = text;
        return text;
    } catch {
        return null;
    }
}

async function copyPrompt(btn, templateId) {
    const text = await loadPrompt(templateId);
    if (!text) return;
    try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = 'Copy prompt to clipboard';
            btn.classList.remove('copied');
        }, 2000);
    } catch {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = 'Copy prompt to clipboard';
            btn.classList.remove('copied');
        }, 2000);
    }
}

// --- Util ---

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Close modal on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Init
init();
