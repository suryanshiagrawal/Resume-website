// Content for every "show". Edit the text here.
const shows = {
  home: {
    photo: true, title: "Welcome to My Story", hero: "#4a0d12", match: "99% Match", year: "2026", rating: "BBA", length: "Season 1",
    blurb: "Marketing dreamer. Pop-culture fiend. Lucknow-born. Streaming now: my resume.",
    rows: [{ heading: "Trending on my profile", cards: [
      ["About Me", "Season 1", "Where it all started and why social work was always in the script."],
      ["Education", "Now streaming", "Three schools, two boards of directors (my parents), one IIM."],
      ["Skills", "Fan favourite", "Canva, ukulele and Spanish at a 'mostly vibes' level."],
      ["Work", "New releases", "Fashion, MUNs, debates and NGOs. A packed season."]]}]
  },
  about: {
    photo: true, title: "About Me: The Origin Story", hero: "#0f3b24", match: "100% Match", year: "Lucknow", rating: "U/A", length: "Origin story",
    blurb: "I grew up in Lucknow, and my father is an environmental consultant, which shaped my upbringing massively. Social work was a prerequisite in our household, like homework, but with more impact.",
    rows: [{ heading: "Key plot points", cards: [
      ["Grew up in Lucknow", "Setting", "City of nawabs, kebabs and chikankari. Great location for a pilot episode."],
      ["The Environment Arc", "Backstory", "Dinner table talk was sustainability long before it was trending."],
      ["Social work, always", "Recurring theme", "Giving back was never optional. It shaped almost every experience on this page."],
      ["Pop Culture Fiend", "Certified", "Reference anything. I will catch it, and probably reference it back."],
      ["The Dream", "Season finale", "A career in marketing, ideally one that lets me use all of the above."]]}]
  },
  education: {
    title: "Education: The Series", hero: "#0b2a5e", match: "98% Match", year: "2016 - now", rating: "CBSE", length: "3 Seasons",
    blurb: "From Lucknow classrooms to Bangalore. Each season raised the stakes.",
    rows: [{ heading: "Seasons", cards: [
      ["S1: Manipal Public School, Lucknow", "Class 10 (CBSE)", "Where the main character began to develop."],
      ["S2: GD Goenka Public School", "Class 12 (CBSE)", "Where MUNs and music began. The plot really thickened here."],
      ["S3: IIM Bangalore", "BBA DBE (ongoing)", "Currently streaming. Renewed for more seasons."]]}]
  },
  skills: {
    title: "Skills: Stranger Skills", hero: "#5a3d00", match: "97% Match", year: "2026", rating: "Creative", length: "3 Episodes",
    blurb: "A mix of talents, hobbies and questionable time management.",
    rows: [{ heading: "Episodes", cards: [
      ["Canva", "Hours watched: too many", "I have spent hours and hours on Canva. Possibly a dated skill now, but I love creating things myself instead of letting AI do it."],
      ["Ukulele", "2 years in", "About two years of playing. Four strings, zero regrets, mild neighbour complaints."],
      ["Spanish", "Intermediate", "Can follow Money Heist without subtitles about half the time. The other half is confident nodding."],
      ]}]
  },
  contact: {
    photo: true, title: "Contact Details", hero: "#0a3b4d", match: "Open to offers", year: "2026", rating: "Say hi", length: "Always available",
    blurb: "Marketing roles, collaborations, or just a good movie recommendation. Reach out.",
    rows: [{ heading: "Get in touch", cards: [
      ["Email", "Fastest reply", '<a href="mailto:suryanshi.agrawal26@iimb.ac.in">suryanshi.agrawal26@iimb.ac.in</a>'],
      ["Phone", "Calls and WhatsApp", '<a href="tel:+918468016192">+91 84680 16192</a>']]}]
  },
  experience: {
    title: "Work: What I've Done", hero: "#3b0a4d", match: "99% Match", year: "2024 - now", rating: "Work", length: "Multiple Seasons",
    blurb: "Social media, student events and NGO work. Based on real events.",
    rows: [
      { heading: "Marketing and events", cards: [
        ["Lucknow Fashion Diary", "Social Media Manager", "My parents own this chikankari store, and I run its social media. Family business, but the content is on me."],
        ["GDGPS MUN '24", "Organiser", "Organised the MUN edition of 2024. Delegates, chairs and chaos, all handled."],
        ["La Victorie '24", "Organiser", "Organised this debate event in 2024. Strong arguments only."]]},
      { heading: "Social impact", cards: [
        ["Inayat (NGO)", "Content Writing Intern and Volunteer", "Interned in the content writing department and volunteered with the NGO."],
        ["Ayra (NGO)", "Volunteer", "Volunteered with the NGO."],
        ["Pledge a Smile (NGO)", "Fundraising Intern", "Interned and worked in the fundraising section."]]},
      { heading: "Corporate", cards: [
        ["Mukesh Raj and Co.", "Intern, CA Firm", "Interned at a chartered accountancy firm. Numbers, deadlines and a very different genre from the rest of this list."]]}]
  }
};

const $ = (s) => document.querySelector(s);

// Original synthesised "ta-dum" (Web Audio), so no copyrighted audio is used.
// To use your own file instead: new Audio("sound.mp3").play()
function playSound() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  const ctx = new AC(), t = ctx.currentTime;
  [[55, 0, 0.5], [82.4, 0.55, 2.0], [110, 0.55, 2.0], [165, 0.6, 1.9]].forEach(([f, s, d]) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = f < 100 ? "sine" : "triangle"; o.frequency.value = f;
    g.gain.setValueAtTime(0, t + s);
    g.gain.linearRampToValueAtTime(0.5, t + s + 0.05);
    g.gain.exponentialRampToValueAtTime(0.001, t + s + d);
    o.connect(g).connect(ctx.destination); o.start(t + s); o.stop(t + s + d);
  });
}

function render(key) {
  const s = shows[key];
  const rows = s.rows.map(r => `<section class="row"><h3>${r.heading}</h3><div class="cards">` +
    r.cards.map(c => `<article class="card"><h4>${c[0]}</h4><div class="tag">${c[1]}</div><p>${c[2]}</p></article>`).join("") +
    `</div></section>`).join("");
  $("#stage").innerHTML = `<header class="hero" style="--hero:${s.hero}">${s.photo ? '<img class="poster" src="images/me.jpg" alt="Portrait of me" onerror="this.remove()">' : ""}<h2>${s.title}</h2>
    <div class="meta"><span class="match">${s.match}</span> ${s.year} <span class="rating">${s.rating}</span> ${s.length}</div>
    <p>${s.blurb}</p><div class="btns"><a class="btn play" href="#" data-show="${key === "home" ? "about" : "home"}">&#9654; Play</a>
    <a class="btn more" href="#" data-show="experience">More info</a></div></header>${rows}`;
  document.querySelectorAll("#navbar a[data-show]").forEach(a => a.classList.toggle("active", a.dataset.show === key));
  window.scrollTo(0, 0);
}

function start(key) {
  playSound();
  $("#profiles").classList.add("hidden");
  $("#intro").classList.remove("hidden");
  setTimeout(() => { $("#intro").classList.add("hidden"); $("#app").classList.remove("hidden"); render(key); }, 2400);
}

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-show]");
  if (!el) return;
  e.preventDefault();
  el.classList.contains("profile") ? start(el.dataset.show) : render(el.dataset.show);
});
$("#switch").addEventListener("click", (e) => {
  e.preventDefault();
  $("#app").classList.add("hidden"); $("#profiles").classList.remove("hidden");
});
