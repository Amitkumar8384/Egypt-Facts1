const button = document.getElementById('btn');
const fact = document.getElementById('fact');
const themeToggle = document.getElementById('themeToggle');

const fallbackFacts = [
    'The Great Pyramid of Giza was built around 2560 BC and remained the tallest man-made structure for over 3,800 years.',
    'Ancient Egyptians invented toothpaste, created around 5000 BC using rock, mint, dried flowers, and pepper.',
    'The Rosetta Stone, discovered in 1799, unlocked the mystery of hieroglyphics after 1,400 years.',
    'Cleopatra VII was a genius linguist who could speak at least 9 different languages.',
    'Egyptian mummification took approximately 70 days and involved removing all internal organs except the heart.',
    'The Nile River was so important to Egyptian civilization that they called it Ar or Aur, meaning black.',
    'Ancient Egypt lasted for over 3,000 years, making it one of history ',
    'Tutankhamun became Pharaoh at just 9 years old and died mysteriously at 19.',
    'Egyptians valued cats so highly that killing a cat, even accidentally, could result in death.',
    'The Sphinx of Giza has a human head and a lion' ,'s body, carved from a single limestone ridge.'
];

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
    const currentScheme = document.documentElement.style.colorScheme || 'dark';
    const newScheme = currentScheme === 'dark' ? 'light' : 'dark';
    document.documentElement.style.colorScheme = newScheme;
    localStorage.setItem('theme', newScheme);
});

button.addEventListener('click', async () => {
    button.disabled = true;
    button.innerHTML = '<span>Searching...</span>';
    fact.innerText = 'The oracle is awakening...';

    try {
        const response = await fetch('https://egypt-facts.onrender.com/api/random', { mode: 'cors' });
        const data = await response.json();
        fact.innerText = data.fact;
    } catch (error) {
        const randomFact = fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
        fact.innerText = randomFact;
    } finally {
        button.disabled = false;
        button.innerHTML = '<span>Discover a Fact</span>';
    }
});

initTheme();