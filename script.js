window.FALCOMP_SUPABASE_URL = "https://vzupbymelpmtpibrfypq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6dXBieW1lbHBtdHBpYnJmeXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExMzI4MDksImV4cCI6MjEwNjcwODgwOX0.5gPhnsv6nztXSO4Nx5TcALfU8vziFjRfF_q8ELUjPxY";

const supabaseClientReady = new Promise((resolve) => {
	function initializeSupabaseClient() {
		if (!window.FALCOMP_SUPABASE && window.supabase?.createClient) {
			window.FALCOMP_SUPABASE = window.supabase.createClient(window.FALCOMP_SUPABASE_URL, supabaseAnonKey);
		}
		resolve(window.FALCOMP_SUPABASE || null);
	}

	if (window.supabase?.createClient) {
		initializeSupabaseClient();
		return;
	}

	const libraryScript = document.createElement("script");
	libraryScript.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
	libraryScript.async = true;
	libraryScript.addEventListener("load", initializeSupabaseClient, { once: true });
	libraryScript.addEventListener("error", () => resolve(null), { once: true });
	document.head.append(libraryScript);
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const languageSelect = document.querySelector("#language-select");
const themeToggle = document.querySelector("#theme-toggle");
const profileDialog = document.querySelector("#student-profile");
const profileOpen = document.querySelector("#profile-open");
const profileClose = document.querySelector("#profile-close");
const profileForm = document.querySelector("#profile-form");
const profileFormStatus = document.querySelector("#profile-form-status");
const profileEmailInput = document.querySelector("#profile-email");
const profileSigninView = document.querySelector("#profile-signin-view");
const profileAccountView = document.querySelector("#profile-account-view");
const profileName = document.querySelector("#profile-name");
const profileAccountId = document.querySelector("#profile-account-id");
const profileSignout = document.querySelector("#profile-signout");
const profileCoursesLink = document.querySelector("#profile-courses-link");
const alumniLoginForm = document.querySelector("#alumni-login-form");
const alumniLoginView = document.querySelector("#alumni-login-view");
const alumniAccountView = document.querySelector("#alumni-account-view");
const alumniProfileName = document.querySelector("#alumni-profile-name");
const alumniAccountEmail = document.querySelector("#alumni-account-email");
const alumniSignout = document.querySelector("#alumni-signout");
const applicationForm = document.querySelector("#application-form");
const applicationCourse = document.querySelector("#applicant-course");
const applicationStatus = document.querySelector("#application-status");
const applicationNext = document.querySelector("#application-next");
const applicationBack = document.querySelector("#application-back");
const applicationFinish = document.querySelector("#application-finish");
const applicationContactStep = document.querySelector("#application-contact-step");
const applicationEducationStep = document.querySelector("#application-education-step");
const applicationFiles = document.querySelector("#school-documents");
const applicationFileList = document.querySelector("#application-file-list");
const applicationFilePreviewUrls = [];
const applicationFilePreview = document.querySelector("#application-file-preview");
const applicationFilePreviewTitle = document.querySelector("#application-file-preview-title");
const applicationFilePreviewContent = document.querySelector("#application-file-preview-content");
const applicationFilePreviewClose = document.querySelector("#application-file-preview-close");
let currentStudent = null;
let applicationSubmitted = false;
let applicationReference = "";
const applicationConfirmation = "Application submitted successfully.";
const applicationSubmitMessages = {
	en: {
		pending: "Sending your application and documents securely...",
		failed: "We couldn't submit the application. Your information is still here; please try again.",
		unavailable: "The submission service is unavailable right now. Please try again later."
	},
	sw: {
		pending: "Ombi na nyaraka zako zinatumwa kwa usalama...",
		failed: "Ombi halikutumwa. Taarifa zako bado zipo hapa; tafadhali jaribu tena.",
		unavailable: "Huduma ya kutuma maombi haipatikani kwa sasa. Tafadhali jaribu tena baadaye."
	}
};

const swahiliTranslations = {
	"Literacy Center": "Kituo cha Elimu ya Kusoma na Kuandika",
	"Courses": "Kozi",
	"Alumni sign in": "Ingia kwa wahitimu",
	"Application portal": "Tovuti ya maombi",
	"Apply to study": "Omba kusoma",
	"Explore": "Gundua",
	"Courses & fees": "Kozi na ada",
	"Contact the center": "Wasiliana na kituo",
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
	"Sign in": "Ingia",
	"Sign in with the email and password connected to your student account.": "Ingia kwa kutumia barua pepe na nenosiri linalohusishwa na akaunti yako ya mwanafunzi.",
	"Student account": "Akaunti ya mwanafunzi",
	"Welcome,": "Karibu,",
	"student.": "mwanafunzi.",
	"Account connected": "Akaunti imeunganishwa",
	"Your course enrollments will appear here when available.": "Kozi ulizojiunga zitaonekana hapa zitakapopatikana.",
	"View courses": "Tazama kozi",
	"Sign out": "Ondoka",
	"Welcome": "Karibu",
	"back.": "tena.",
	"Sign in to your alumni profile and reconnect with your learning community.": "Ingia kwenye wasifu wako wa mhitimu na uwasiliane tena na jumuiya yako ya kujifunza.",
	"Continue to alumni profile": "Endelea kwenye wasifu wa mhitimu",
	"Preview only: passwords are not checked or saved, and no alumni records are accessed. Connect a secure sign-in service before launch.": "Onyesho pekee: nenosiri halikaguliwi wala kuhifadhiwa, na rekodi za wahitimu hazifikiwi. Unganisha mfumo salama wa kuingia kabla ya kuzindua.",
	"alumnus.": "mhitimu.",
	"Alumni profile preview": "Onyesho la wasifu wa mhitimu",
	"Community news, events, and alumni updates can appear here when accounts are connected.": "Habari za jumuiya, matukio na taarifa za wahitimu zitaonekana hapa akaunti zitakapounganishwa.",
	"Start your": "Anza",
	"application.": "maombi yako.",
	"Tell us how to reach you and which course you’re interested in.": "Tuambie jinsi ya kuwasiliana nawe na kozi unayotaka.",
	"Your details": "Taarifa zako",
	"Full name": "Jina kamili",
	"Phone number": "Nambari ya simu",
	"Course of interest": "Kozi unayotaka",
	"Select a course": "Chagua kozi",
	"Continue to education": "Endelea na elimu",
	"Education background": "Historia ya elimu",
	"Previous school": "Shule uliyosoma awali",
	"Last class or level completed": "Darasa au kiwango cha mwisho ulichomaliza",
	"Year you left school": "Mwaka ulioacha shule",
	"School documents": "Nyaraka za shule",
	"Attach certificates, school reports, or other relevant records (PDF, JPG, or PNG).": "Ambatisha vyeti, ripoti za shule au rekodi nyingine muhimu (PDF, JPG au PNG).",
	"Finish application": "Kamilisha ombi",
	"Complete the education details and attach at least one school document before finishing.": "Jaza taarifa za elimu na ambatisha angalau hati moja ya shule kabla ya kumaliza.",
	"Back": "Rudi",
	"Complete the form and attach your school documents to submit your application.": "Jaza fomu na ambatisha nyaraka za shule ili kutuma ombi lako.",
	[applicationConfirmation]: "Ombi limetumwa kwa mafanikio.",
};

const studentLoginMessages = {
	en: {
		failed: "Email or password is incorrect.",
		unavailable: "Sign-in is temporarily unavailable. Please try again later.",
		unlinked: "No approved student profile is linked to this account. Contact the center.",
		profileUnavailable: "Your approved student profile could not be loaded. Please try again later."
	},
	sw: {
		failed: "Barua pepe au nenosiri si sahihi.",
		unavailable: "Kuingia hakupatikani kwa sasa. Tafadhali jaribu tena baadaye.",
		unlinked: "Hakuna wasifu wa mwanafunzi ulioidhinishwa unaohusishwa na akaunti hii. Wasiliana na kituo.",
		profileUnavailable: "Wasifu wako wa mwanafunzi ulioidhinishwa hauwezi kupakiwa sasa. Tafadhali jaribu tena baadaye."
	}
};

const interfaceLabels = {
	en: {
		title: "FAL-COMP Literacy Center | Skills for what's next",
		titles: {
			home: "FAL-COMP Literacy Center | Skills for what's next",
			courses: "Courses & Fees | FAL-COMP Literacy Center",
			alumni: "Alumni Community | FAL-COMP Literacy Center",
			"alumni-login": "Alumni Sign In | FAL-COMP Literacy Center",
			application: "Application Portal | FAL-COMP Literacy Center"
		},
		description: "Build practical computer, creative, and digital skills at FAL-COMP Literacy Center.",
		home: "FAL-COMP Literacy Center home",
		navigation: "Main navigation",
		chooseLanguage: "Choose language",
		email: "Email address",
		emailPlaceholder: "you@example.com",
		darkMode: "Dark mode",
		profileOpen: "Student sign in",
		closeProfile: "Close profile",
		openNavigation: "Open navigation",
		closeNavigation: "Close navigation",
		enquire: "Apply for",
		courses: ["Computer basics", "Programming languages", "Graphic design", "Microsoft suite", "Digital skills"]
	},
	sw: {
		title: "Kituo cha FAL-COMP | Ujuzi wa maisha yajayo",
		titles: {
			home: "Kituo cha FAL-COMP | Ujuzi wa maisha yajayo",
			courses: "Kozi na Ada | Kituo cha FAL-COMP",
			alumni: "Jumuiya ya Wahitimu | Kituo cha FAL-COMP",
			"alumni-login": "Ingia kwa Wahitimu | Kituo cha FAL-COMP",
			application: "Tovuti ya Maombi | Kituo cha FAL-COMP"
		},
		description: "Jifunze ujuzi wa kompyuta, ubunifu na teknolojia katika Kituo cha Elimu ya Kusoma na Kuandika cha FAL-COMP.",
		home: "Mwanzo wa Kituo cha FAL-COMP",
		navigation: "Urambazaji mkuu",
		chooseLanguage: "Chagua lugha",
		email: "Anwani ya barua pepe",
		emailPlaceholder: "barua-pepe-yako@mfano.com",
		darkMode: "Hali ya giza",
		profileOpen: "Ingia kwenye akaunti ya mwanafunzi",
		closeProfile: "Funga wasifu",
		openNavigation: "Fungua menyu ya urambazaji",
		closeNavigation: "Funga menyu ya urambazaji",
		enquire: "Omba kozi ya",
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
	if (applicationSubmitted && applicationStatus) {
		const confirmation = translate ? swahiliTranslations[applicationConfirmation] : applicationConfirmation;
		const referenceLabel = translate ? "Nambari ya rejea" : "Reference";
		applicationStatus.textContent = `${confirmation} ${referenceLabel}: ${applicationReference}`;
	}

	document.documentElement.lang = translate ? "sw" : "en";
	document.title = labels.titles[document.body.dataset.page || "home"] || labels.title;
	document.querySelector('meta[name="description"]').content = labels.description;
	document.querySelector('meta[name="theme-color"]').content = themeToggle.checked ? "#111f2b" : "#174c78";
	document.querySelector(".brand").setAttribute("aria-label", labels.home);
	siteNav.setAttribute("aria-label", labels.navigation);
	languageSelect.setAttribute("aria-label", labels.chooseLanguage);
	themeToggle.setAttribute("aria-label", labels.darkMode);
	if (profileEmailInput) {
		profileEmailInput.setAttribute("aria-label", labels.email);
		profileEmailInput.placeholder = labels.emailPlaceholder;
	}
	if (profileOpen) profileOpen.setAttribute("aria-label", labels.profileOpen);
	if (profileClose) profileClose.setAttribute("aria-label", labels.closeProfile);
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

if (profileDialog) {
	function showStudentProfile(student) {
		currentStudent = student;
		profileName.textContent = student.student_name || "student.";
		const studentId = student.student_id_number ?? student.student_id ?? "";
		const idLabel = languageSelect.value === "sw" ? "Nambari ya mwanafunzi" : "Student ID";
		profileAccountId.textContent = `${idLabel}: ${studentId}`;
		profileSigninView.hidden = true;
		profileAccountView.hidden = false;
	}

	function showStudentSignIn() {
		profileAccountView.hidden = true;
		profileSigninView.hidden = false;
	}

	async function loadStudentProfile(client, userId) {
		const { data: student, error } = await client
			.from("students")
			.select("student_name, student_id_number")
			.eq("approval_status", "approved")
			.eq("user_id", userId)
			.maybeSingle();
		if (error) throw error;
		return student;
	}

	function openStudentProfile() {
		if (currentStudent) showStudentProfile(currentStudent);
		else showStudentSignIn();
		if (!profileDialog.open) profileDialog.showModal();
	}

	supabaseClientReady.then(async (client) => {
		if (!client) return;
		const { data, error } = await client.auth.getSession();
		if (error || !data.session) return;
		try {
			const student = await loadStudentProfile(client, data.session.user.id);
			if (student) {
				showStudentProfile(student);
			} else {
				await client.auth.signOut();
				const language = languageSelect.value === "sw" ? "sw" : "en";
				profileFormStatus.textContent = studentLoginMessages[language].unlinked;
				profileFormStatus.hidden = false;
			}
		} catch {
			const language = languageSelect.value === "sw" ? "sw" : "en";
			profileFormStatus.textContent = studentLoginMessages[language].profileUnavailable;
			profileFormStatus.hidden = false;
			return;
		}
	});

	if (profileOpen) {
		profileOpen.addEventListener("click", () => {
			openStudentProfile();
		});
	}

	if (profileClose) profileClose.addEventListener("click", () => profileDialog.close());

	profileDialog.addEventListener("close", () => {
		if (window.location.hash === "#student-profile") {
			history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
		}
	});

	if (profileForm) {
		const submitButton = profileForm.querySelector('button[type="submit"]');
		const submitLabel = submitButton.textContent;

		function showStudentError(message) {
			const language = languageSelect.value === "sw" ? "sw" : "en";
			profileFormStatus.textContent = studentLoginMessages[language][message];
			profileFormStatus.hidden = false;
		}

		profileEmailInput.addEventListener("input", () => {
			profileFormStatus.hidden = true;
		});

		profileForm.addEventListener("submit", async (event) => {
			event.preventDefault();
			const formData = new FormData(profileForm);
			const email = formData.get("email").trim();
			const password = formData.get("password");
			const client = await supabaseClientReady;
			if (!client) {
				showStudentError("unavailable");
				return;
			}

			submitButton.disabled = true;
			profileFormStatus.hidden = true;
			try {
				const { data: authData, error: authError } = await client.auth.signInWithPassword({ email, password });
				if (authError || !authData.user) {
					showStudentError("failed");
					return;
				}

				const student = await loadStudentProfile(client, authData.user.id);
				if (!student) {
					await client.auth.signOut();
					showStudentError("unlinked");
					return;
				}
				showStudentProfile(student);
			} catch {
				showStudentError("unavailable");
			} finally {
				submitButton.disabled = false;
				submitButton.firstChild.textContent = submitLabel.trim();
			}
		});
	}

	if (profileSignout) {
		profileSignout.addEventListener("click", async () => {
			currentStudent = null;
			const client = await supabaseClientReady;
			await client?.auth.signOut();
			showStudentSignIn();
			profileForm.reset();
		});
	}

	if (profileCoursesLink) profileCoursesLink.addEventListener("click", () => profileDialog.close());
	window.addEventListener("hashchange", () => {
		if (window.location.hash === "#student-profile") openStudentProfile();
	});
	if (window.location.hash === "#student-profile") openStudentProfile();
}

if (alumniLoginForm) {
	function showAlumniProfile(email) {
		const name = email.split("@")[0].replace(/[._-]+/g, " ").trim();
		alumniProfileName.textContent = name ? `${name.charAt(0).toUpperCase()}${name.slice(1)}.` : "alumnus.";
		alumniAccountEmail.textContent = email;
		alumniLoginView.hidden = true;
		alumniAccountView.hidden = false;
	}

	try {
		const savedAlumniEmail = sessionStorage.getItem("falcomp-alumni-email");
		if (savedAlumniEmail) showAlumniProfile(savedAlumniEmail);
	} catch {
		alumniLoginForm.reset();
	}

	alumniLoginForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const email = new FormData(alumniLoginForm).get("email").trim();
		showAlumniProfile(email);
		try {
			sessionStorage.setItem("falcomp-alumni-email", email);
		} catch {
			return;
		}
	});

	alumniSignout.addEventListener("click", () => {
		try {
			sessionStorage.removeItem("falcomp-alumni-email");
		} catch {
			alumniLoginView.hidden = false;
			alumniAccountView.hidden = true;
			alumniLoginForm.reset();
			return;
		}
		alumniLoginView.hidden = false;
		alumniAccountView.hidden = true;
		alumniLoginForm.reset();
	});
}

if (applicationForm) {
	const requestedCourse = new URLSearchParams(window.location.search).get("course");
	if (requestedCourse && [...applicationCourse.options].some((option) => option.value === requestedCourse)) {
		applicationCourse.value = requestedCourse;
	}

	applicationNext.addEventListener("click", () => {
		for (const field of applicationContactStep.querySelectorAll("input, select")) {
			if (!field.reportValidity()) return;
		}
		applicationContactStep.hidden = true;
		applicationEducationStep.hidden = false;
		document.querySelector("#previous-school").focus();
	});

	applicationBack.addEventListener("click", () => {
		applicationEducationStep.hidden = true;
		applicationContactStep.hidden = false;
		applicationNext.focus();
	});

	applicationFiles.addEventListener("change", () => {
		for (const url of applicationFilePreviewUrls) URL.revokeObjectURL(url);
		applicationFilePreviewUrls.length = 0;
		applicationFileList.replaceChildren();
		for (const file of applicationFiles.files) {
			const item = document.createElement("li");
			const previewLink = document.createElement("a");
			const previewUrl = URL.createObjectURL(file);
			applicationFilePreviewUrls.push(previewUrl);
			previewLink.href = previewUrl;
			previewLink.dataset.previewName = file.name;
			previewLink.dataset.previewType = file.type;
			previewLink.textContent = file.name;
			item.append(previewLink, ` (${Math.ceil(file.size / 1024)} KB)`);
			applicationFileList.append(item);
		}
	});

	applicationFileList.addEventListener("click", (event) => {
		const link = event.target.closest("a[data-preview-name]");
		if (!link) return;
		event.preventDefault();
		applicationFilePreviewTitle.textContent = link.dataset.previewName;
		applicationFilePreviewContent.replaceChildren();

		if (link.dataset.previewType.startsWith("image/")) {
			const image = document.createElement("img");
			image.src = link.href;
			image.alt = link.dataset.previewName;
			applicationFilePreviewContent.append(image);
		} else {
			const documentFrame = document.createElement("iframe");
			documentFrame.src = link.href;
			documentFrame.title = link.dataset.previewName;
			applicationFilePreviewContent.append(documentFrame);
		}

		applicationFilePreview.showModal();
	});

	applicationFilePreviewClose.addEventListener("click", () => applicationFilePreview.close());

	window.addEventListener("pagehide", () => {
		for (const url of applicationFilePreviewUrls) URL.revokeObjectURL(url);
	});

	applicationFinish.addEventListener("click", (event) => {
		const invalidField = [...applicationEducationStep.querySelectorAll("input, select")]
			.find((field) => !field.checkValidity());
		if (!invalidField) return;

		event.preventDefault();
		invalidField.reportValidity();
		const isSwahili = languageSelect.value === "sw";
		applicationStatus.textContent = isSwahili
			? swahiliTranslations["Complete the education details and attach at least one school document before finishing."]
			: "Complete the education details and attach at least one school document before finishing.";
		applicationStatus.focus();
	});

	applicationForm.addEventListener("submit", async (event) => {
		event.preventDefault();
		const client = await supabaseClientReady;
		const language = languageSelect.value === "sw" ? "sw" : "en";
		if (!client) {
			applicationStatus.textContent = applicationSubmitMessages[language].unavailable;
			applicationStatus.focus();
			return;
		}

		applicationFinish.disabled = true;
		applicationStatus.textContent = applicationSubmitMessages[language].pending;
		const controller = new AbortController();
		const timeout = window.setTimeout(() => controller.abort(), 60000);
		try {
			const response = await fetch(`${window.FALCOMP_SUPABASE_URL}/functions/v1/application-submit`, {
				method: "POST",
				headers: {
					apikey: supabaseAnonKey,
					Authorization: `Bearer ${supabaseAnonKey}`
				},
				body: new FormData(applicationForm),
				signal: controller.signal
			});
			const result = await response.json().catch(() => null);
			if (!response.ok || !result?.application_id) throw new Error("Application submission failed");

			applicationSubmitted = true;
			applicationReference = result.application_id;
			applicationForm.hidden = true;
			const confirmation = language === "sw" ? swahiliTranslations[applicationConfirmation] : applicationConfirmation;
			const referenceLabel = language === "sw" ? "Nambari ya rejea" : "Reference";
			applicationStatus.textContent = `${confirmation} ${referenceLabel}: ${applicationReference}`;
		} catch {
			applicationStatus.textContent = applicationSubmitMessages[language].failed;
		} finally {
			window.clearTimeout(timeout);
			applicationFinish.disabled = false;
			applicationStatus.focus();
		}
	});
}

menuToggle.addEventListener("click", () => {
	const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
	const labels = interfaceLabels[languageSelect.value] || interfaceLabels.en;
	menuToggle.setAttribute("aria-expanded", String(!isExpanded));
	menuToggle.setAttribute("aria-label", isExpanded ? labels.openNavigation : labels.closeNavigation);
	siteNav.classList.toggle("is-open", !isExpanded);
});

siteNav.addEventListener("click", (event) => {
	if (event.target.closest("a")) {
		const labels = interfaceLabels[languageSelect.value] || interfaceLabels.en;
		menuToggle.setAttribute("aria-expanded", "false");
		menuToggle.setAttribute("aria-label", labels.openNavigation);
		siteNav.classList.remove("is-open");
	}
});
