const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const languageSelect = document.querySelector("#language-select");
const themeToggle = document.querySelector("#theme-toggle");
const profileDialog = document.querySelector("#profile-dialog");
const profileOpen = document.querySelector("#profile-open");
const profileClose = document.querySelector("#profile-close");
const profileForm = document.querySelector("#profile-form");
const profileSigninView = document.querySelector("#profile-signin-view");
const profileAccountView = document.querySelector("#profile-account-view");
const profileName = document.querySelector("#profile-name");
const profileAccountEmail = document.querySelector("#profile-account-email");
const profileSignout = document.querySelector("#profile-signout");
const profileCoursesLink = document.querySelector("#profile-courses-link");
let currentStudentEmail = null;

const swahiliTranslations = {
	"Literacy Center": "Kituo cha Elimu ya Kusoma na Kuandika",
	"Courses": "Kozi",
	"Our center": "Kuhusu kituo",
	"Alumni": "Wahitimu",
	"Find your course": "Chagua kozi yako",
	"Learn by doing. Grow with confidence.": "Jifunze kwa vitendo. Jiamini zaidi.",
	"Skills for": "Ujuzi wa",
	"what’s": "maisha yajayo",
	"next.": ".",
	"Practical computer and digital skills for work, study, and everyday life. Start with what you need and build from there.": "Jifunze ujuzi wa kompyuta na teknolojia kwa kazi, masomo na maisha ya kila siku. Anza na unachohitaji na uendelee kujifunza.",
	"Explore our courses": "Tazama kozi zetu",
	"Learn a skill.": "Jifunze ujuzi.",
	"Open a door.": "Fungua fursa.",
	"Scroll to explore": "Sogeza chini kuchunguza",
	"Where would you like to go?": "Ungependa kwenda wapi?",
	"Explore courses": "Tazama kozi",
	"Alumni community": "Jumuiya ya wahitimu",
	"01 / About FAL-COMP": "01 / Kuhusu FAL-COMP",
	"A welcoming place to make technology": "Mahali pa kukaribisha pa kufanya teknolojia",
	"make sense.": "ieleweke.",
	"FAL-COMP Literacy Center helps learners turn curiosity into practical ability. Our courses focus on useful skills you can practise, apply, and keep growing long after class.": "Kituo cha FAL-COMP huwasaidia wanafunzi kugeuza hamu ya kujifunza kuwa ujuzi wa vitendo. Kozi zetu huzingatia ujuzi unaoweza kufanyia mazoezi, kutumia na kuendeleza hata baada ya darasa.",
	"Find the right starting point": "Pata mwanzo unaokufaa",
	"Practical learning": "Kujifunza kwa vitendo",
	"Spend your time doing, not just watching.": "Tumia muda wako kufanya, si kutazama tu.",
	"Skills that travel": "Ujuzi wa kila mahali",
	"Use what you learn at school, at work, and beyond.": "Tumia ulichojifunza shuleni, kazini na kwingineko.",
	"Room to grow": "Nafasi ya kukua",
	"Begin with the basics or take your skills further.": "Anza na misingi au endeleza ujuzi wako zaidi.",
	"02 / Learn something useful": "02 / Jifunze ujuzi muhimu",
	"Find your next skill": "Tafuta ujuzi wako unaofuata",
	"Choose your": "Chagua",
	"starting point.": "mwanzo wako.",
	"Focused courses, straightforward fees, and monthly payment options to help you plan.": "Kozi zenye mwelekeo, ada zilizo wazi na malipo ya kila mwezi ili kukusaidia kupanga.",
	"Computer basics": "Misingi ya kompyuta",
	"Get comfortable using a computer, managing files, and working online.": "Jifunze kutumia kompyuta, kupanga faili na kufanya kazi mtandaoni.",
	"Total course fee": "Ada yote ya kozi",
	"Monthly plan": "Malipo ya kila mwezi",
	" / 1 month": " / mwezi 1",
	"Programming languages": "Lugha za programu",
	"Explore coding concepts and learn how to build with programming languages.": "Gundua misingi ya uandishi wa programu na ujifunze kutengeneza programu.",
	" / 4 months": " / miezi 4",
	"Graphic design": "Ubunifu wa picha",
	"Learn visual communication and create polished designs for print and digital.": "Jifunze mawasiliano ya picha na utengeneze michoro bora ya kuchapisha na ya kidijitali.",
	" / 3 months": " / miezi 3",
	"Microsoft suite": "Vifurushi vya Microsoft",
	"Build confidence with everyday documents, spreadsheets, and presentations.": "Jenga ujuzi wa kutengeneza nyaraka, lahajedwali na mawasilisho.",
	" / 2 months": " / miezi 2",
	"Digital skills": "Ujuzi wa kidijitali",
	"Navigate digital tools and online services with confidence and care.": "Tumia zana za kidijitali na huduma za mtandaoni kwa ujasiri na uangalifu.",
	"Installment schedules shown are based on the monthly amounts and durations provided by the center.": "Mpangilio wa malipo unaonyesha kiasi cha kila mwezi na muda uliotolewa na kituo.",
	"03 / Keep in touch": "03 / Endelea kuwasiliana",
	"ALUMNI": "WAHITIMU",
	"COMMUNITY": "JUMUIYA",
	"LEARN · SHARE · GROW": "JIFUNZE · SHIRIKI · KUA",
	"Your learning doesn't stop here": "Kujifunza kwako kunaendelea",
	"The next chapter is": "Sura inayofuata ni",
	"together.": "pamoja.",
	"Stay connected with fellow learners, share what you’re working on, and keep discovering new ways to put your skills to use. The FAL-COMP alumni community is a place to keep learning and support one another.": "Endelea kuwasiliana na wanafunzi wenzako, shiriki unachofanya na ugundue njia mpya za kutumia ujuzi wako. Jumuiya ya wahitimu wa FAL-COMP ni mahali pa kuendelea kujifunza na kusaidiana.",
	"Ask about the alumni community": "Uliza kuhusu jumuiya ya wahitimu",
	"04 / Good to know": "04 / Taarifa muhimu",
	"A few helpful": "Majibu machache",
	"answers.": "ya kukusaidia.",
	"Can I pay in installments?": "Je, ninaweza kulipa kwa awamu?",
	"Yes. Each course above shows its monthly installment amount and the number of months in the plan.": "Ndiyo. Kila kozi hapo juu inaonyesha kiasi cha malipo ya kila mwezi na idadi ya miezi ya mpango.",
	"Which course should I start with?": "Nianze na kozi gani?",
	"If you’re new to computers, Computer basics is a good place to begin. Choose another course if you already know what skill you want to build.": "Kama ndio unaanza kutumia kompyuta, Misingi ya kompyuta ni mwanzo mzuri. Chagua kozi nyingine ikiwa tayari unajua ujuzi unaotaka kujifunza.",
	"How do I ask about enrollment?": "Ninauliziaje kuhusu kujiunga?",
	"Use the enquiry section below to get in touch with the center about course availability and enrollment.": "Tumia sehemu ya mawasiliano hapa chini kuuliza kituo kuhusu nafasi za kozi na kujiunga.",
	"05 / Take the first step": "05 / Anza hatua ya kwanza",
	"Ready when you are": "Ukiwa tayari, tuanze",
	"Make room for": "Jipe nafasi ya",
	"what you can do.": "mambo unayoweza kufanya.",
	"Ask the center about course dates, availability, and getting started.": "Uliza kituo kuhusu tarehe za kozi, nafasi zilizopo na jinsi ya kuanza.",
	"View course fees": "Tazama ada za kozi",
	"Back to top": "Rudi juu",
	"Practical skills. Brighter possibilities.": "Ujuzi wa vitendo. Fursa zaidi.",
	"Dark mode": "Hali ya giza",
	"FAL-COMP / STUDENT SPACE": "FAL-COMP / ENEO LA MWANAFUNZI",
	"Student sign in": "Ingia kwenye akaunti ya mwanafunzi",
	"Welcome back": "Karibu tena",
	"Your learning,": "Masomo yako,",
	"in one place.": "sehemu moja.",
	"Sign in to see your student profile.": "Ingia ili kuona wasifu wako wa mwanafunzi.",
	"Email address": "Anwani ya barua pepe",
	"Password": "Nenosiri",
	"Continue to demo profile": "Endelea kuona wasifu wa mfano",
	"Preview only: this form does not verify passwords or access student records. Secure authentication must be connected before launch.": "Onyesho pekee: fomu hii haithibitishi nenosiri wala kufikia rekodi za wanafunzi. Mfumo salama wa kuingia unahitajika kabla ya tovuti kuzinduliwa.",
	"Student profile preview": "Onyesho la wasifu wa mwanafunzi",
	"Welcome,": "Karibu,",
	"student.": "mwanafunzi.",
	"Profile preview": "Onyesho la wasifu",
	"Course enrollments will appear here when student accounts are connected.": "Taarifa za kozi ulizojiunga zitaonekana hapa akaunti za wanafunzi zitakapounganishwa.",
	"View courses": "Tazama kozi",
	"Sign out": "Ondoka"
};

const interfaceLabels = {
	en: {
		title: "FAL-COMP Literacy Center | Skills for what's next",
		description: "Build practical computer, creative, and digital skills at FAL-COMP Literacy Center.",
		home: "FAL-COMP Literacy Center home",
		navigation: "Main navigation",
		chooseLanguage: "Choose language",
		darkMode: "Dark mode",
		profileOpen: "Student sign in",
		closeProfile: "Close profile",
		openNavigation: "Open navigation",
		closeNavigation: "Close navigation",
		enquire: "Enquire about",
		courses: ["Computer basics", "Programming languages", "Graphic design", "Microsoft suite", "Digital skills"]
	},
	sw: {
		title: "Kituo cha FAL-COMP | Ujuzi wa maisha yajayo",
		description: "Jifunze ujuzi wa kompyuta, ubunifu na teknolojia katika Kituo cha Elimu ya Kusoma na Kuandika cha FAL-COMP.",
		home: "Mwanzo wa Kituo cha FAL-COMP",
		navigation: "Urambazaji mkuu",
		chooseLanguage: "Chagua lugha",
		darkMode: "Hali ya giza",
		profileOpen: "Ingia kwenye akaunti ya mwanafunzi",
		closeProfile: "Funga wasifu",
		openNavigation: "Fungua menyu ya urambazaji",
		closeNavigation: "Funga menyu ya urambazaji",
		enquire: "Ulizia kuhusu",
		courses: ["Misingi ya kompyuta", "Lugha za programu", "Ubunifu wa picha", "Vifurushi vya Microsoft", "Ujuzi wa kidijitali"]
	}
};

const originalText = new Map();
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
let textNode;
while ((textNode = textWalker.nextNode())) {
	originalText.set(textNode, textNode.nodeValue);
}

function readPreference(key, fallback) {
	try {
		return localStorage.getItem(key) || fallback;
	} catch {
		return fallback;
	}
}

function savePreference(key, value) {
	try {
		localStorage.setItem(key, value);
	} catch {
		return;
	}
}

function setLanguage(language) {
	const labels = interfaceLabels[language] || interfaceLabels.en;
	const translate = language === "sw";

	for (const [node, source] of originalText) {
		const trimmed = source.trim();
		const translation = translate ? swahiliTranslations[trimmed] : null;
		if (translation) {
			const leadingWhitespace = source.match(/^\s*/)[0];
			const trailingWhitespace = source.match(/\s*$/)[0];
			node.nodeValue = `${leadingWhitespace}${translation}${trailingWhitespace}`;
		} else {
			node.nodeValue = source;
		}
	}

	document.documentElement.lang = translate ? "sw" : "en";
	document.title = labels.title;
	document.querySelector('meta[name="description"]').content = labels.description;
	document.querySelector('meta[name="theme-color"]').content = themeToggle.checked ? "#111f2b" : "#174c78";
	document.querySelector(".brand").setAttribute("aria-label", labels.home);
	siteNav.setAttribute("aria-label", labels.navigation);
	languageSelect.setAttribute("aria-label", labels.chooseLanguage);
	themeToggle.setAttribute("aria-label", labels.darkMode);
	profileOpen.setAttribute("aria-label", labels.profileOpen);
	profileClose.setAttribute("aria-label", labels.closeProfile);
	menuToggle.setAttribute("aria-label", menuToggle.getAttribute("aria-expanded") === "true" ? labels.closeNavigation : labels.openNavigation);
	document.querySelectorAll(".course-arrow").forEach((link, index) => {
		link.setAttribute("aria-label", `${labels.enquire} ${labels.courses[index]}`);
	});
}

document.querySelector("#year").textContent = new Date().getFullYear();

const savedTheme = readPreference("falcomp-theme", "light");
themeToggle.checked = savedTheme === "dark";
themeToggle.setAttribute("aria-checked", String(themeToggle.checked));
document.documentElement.dataset.theme = themeToggle.checked ? "dark" : "light";

themeToggle.addEventListener("change", () => {
	const theme = themeToggle.checked ? "dark" : "light";
	document.documentElement.dataset.theme = theme;
	themeToggle.setAttribute("aria-checked", String(themeToggle.checked));
	document.querySelector('meta[name="theme-color"]').content = themeToggle.checked ? "#111f2b" : "#174c78";
	savePreference("falcomp-theme", theme);
});

const savedLanguage = readPreference("falcomp-language", "en");
languageSelect.value = savedLanguage === "sw" ? "sw" : "en";
setLanguage(languageSelect.value);

languageSelect.addEventListener("change", () => {
	setLanguage(languageSelect.value);
	savePreference("falcomp-language", languageSelect.value);
});

function showStudentProfile(email) {
	currentStudentEmail = email;
	const name = email.split("@")[0].replace(/[._-]+/g, " ").trim();
	profileName.textContent = name ? `${name.charAt(0).toUpperCase()}${name.slice(1)}.` : "student.";
	profileAccountEmail.textContent = email;
	profileSigninView.hidden = true;
	profileAccountView.hidden = false;
}

function showStudentSignIn() {
	profileAccountView.hidden = true;
	profileSigninView.hidden = false;
}

try {
	const savedStudentEmail = sessionStorage.getItem("falcomp-student-email");
	if (savedStudentEmail) {
		showStudentProfile(savedStudentEmail);
	}
} catch {
	currentStudentEmail = null;
}

profileOpen.addEventListener("click", () => {
	if (currentStudentEmail) {
		showStudentProfile(currentStudentEmail);
	} else {
		showStudentSignIn();
	}
	profileDialog.showModal();
});

profileClose.addEventListener("click", () => profileDialog.close());

profileForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const email = new FormData(profileForm).get("email").trim();
	showStudentProfile(email);
	try {
		sessionStorage.setItem("falcomp-student-email", email);
	} catch {
		return;
	}
});

profileSignout.addEventListener("click", () => {
	currentStudentEmail = null;
	try {
		sessionStorage.removeItem("falcomp-student-email");
	} catch {
		showStudentSignIn();
		return;
	}
	showStudentSignIn();
	profileForm.reset();
});

profileCoursesLink.addEventListener("click", () => profileDialog.close());

menuToggle.addEventListener("click", () => {
	const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
	menuToggle.setAttribute("aria-expanded", String(!isExpanded));
	menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
	siteNav.classList.toggle("is-open", !isExpanded);
});

siteNav.addEventListener("click", (event) => {
	if (event.target.closest("a")) {
		menuToggle.setAttribute("aria-expanded", "false");
		menuToggle.setAttribute("aria-label", "Open navigation");
		siteNav.classList.remove("is-open");
	}
});
