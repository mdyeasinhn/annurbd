document.addEventListener('DOMContentLoaded', function() {
    const candidateId = getUrlParameter('id');

    if (candidateId) {
        loadCandidateProfile(candidateId);
    }

    loadAllCandidates();
});

function loadCandidateProfile(candidateId) {
    const container = document.getElementById('candidate-profile');
    const candidate = data.teamMembers.find(member => member.id === candidateId);

    if (!container || !candidate) return;

    container.innerHTML = `
        <div class="profile-card bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-white/20">
            <div class="grid lg:grid-cols-5 gap-8">
                <!-- Profile Image and Basic Info -->
                <div class="lg:col-span-2 text-center">
                    <div class="relative inline-block">
                        <img src="${candidate.image}" alt="${candidate.name}" class="w-56 h-56 rounded-3xl mx-auto mb-6 object-cover shadow-2xl border-4 border-white">
                        <div class="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                    <h1 class="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">${candidate.name}</h1>
                    <p class="text-xl text-blue-600 font-semibold mb-6">${candidate.position}</p>

                    <!-- Skills Section -->
                    <div class="mb-6">
                        <h3 class="text-lg font-semibold mb-3 text-gray-700">スキル</h3>
                        <div class="flex flex-wrap gap-2 justify-center">
                            ${candidate.skills.map(skill => `
                                <span class="skill-badge">${skill}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Detailed Information -->
                <div class="lg:col-span-3 space-y-8">
                    <div>
                        <h2 class="text-3xl font-bold mb-4 text-gray-800">プロフィール</h2>
                        <p class="text-gray-600 text-lg leading-relaxed">${candidate.bio}</p>
                    </div>

                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl">
                            <div class="flex items-center mb-3">
                                <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <h3 class="text-xl font-bold text-gray-800">経験年数</h3>
                            </div>
                            <p class="text-gray-700 text-lg font-medium">${candidate.experience}</p>
                        </div>

                        <div class="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl">
                            <div class="flex items-center mb-3">
                                <div class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                    </svg>
                                </div>
                                <h3 class="text-xl font-bold text-gray-800">学歴</h3>
                            </div>
                            <p class="text-gray-700 text-lg">${candidate.education}</p>
                        </div>
                    </div>

                    <!-- Contact Button -->
                    <div class="flex justify-center mt-8">
                        <button class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            お問い合わせ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadAllCandidates() {
    const container = document.getElementById('all-candidates');
    if (!container) return;

    container.innerHTML = data.teamMembers.map(member => `
        <div class="card p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-100">
            <div class="relative inline-block mb-6">
                <img src="${member.image}" alt="${member.name}" class="w-28 h-28 rounded-2xl mx-auto object-cover shadow-lg">
                <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <h3 class="text-2xl font-bold mb-2 text-gray-800">${member.name}</h3>
            <p class="text-blue-600 font-semibold mb-4">${member.position}</p>
            <p class="text-gray-600 mb-6 text-sm leading-relaxed">${member.bio}</p>
            <div class="flex flex-wrap gap-1 justify-center mb-6">
                ${member.skills.slice(0, 2).map(skill => `
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">${skill}</span>
                `).join('')}
                ${member.skills.length > 2 ? `<span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">+${member.skills.length - 2}</span>` : ''}
            </div>
            <a href="candidate-information.html?id=${member.id}" class="inline-block mt-4 text-blue-600 hover:underline">プロフィールを見る</a>
        </div>
    `).join('');
}