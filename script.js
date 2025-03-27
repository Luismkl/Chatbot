
function sendMessage() {
    const userInput = document.getElementById("user-input");
    const message = userInput.value.trim();

    if (message !== "") {
        // Benutzer-Nachricht anzeigen
        addMessageToChat("user-message", message);

        // Bot-Antwort
        setTimeout(() => {
            const response = getBotResponse(message);
            
            if (response.startsWith("img:")) {
                // Wenn die Antwort ein Bild ist
                const imgSrc = response.replace("img:", "").trim();
                addImageToChat("bot-message", imgSrc);
            } else {
                // Normale Textantwort
                addMessageToChat("bot-message", response);
            }
        }, 750);

        // Eingabefeld leeren
        userInput.value = "";
        userInput.focus();
    }
}


function addMessageToChat(type, text) {
    const chatHistory = document.getElementById("chat-history");

    // Neues Nachrichten-Element erstellen
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", type);
    
    messageElement.innerHTML = text;

    // Zur Chat-Historie hinzufügen und automatisch scrollen
    chatHistory.appendChild(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function addImageToChat(type, imgSrc) {
    const chatHistory = document.getElementById("chat-history");

    // Neues Nachrichten-Element erstellen
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", type);

    const imgElement = document.createElement("img");
    imgElement.src = imgSrc;
    imgElement.alt = "Bot response image";
    imgElement.style.maxWidth = "100%";

    messageElement.appendChild(imgElement);
    chatHistory.appendChild(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

function selectFAQ(question) {
    addMessageToChat("user-message", question);
    
    // Antwort vom Bot anzeigen
    setTimeout(() => {
        const response = getBotResponse(question); // Hole die Antwort vom Bot
        
        if (response.startsWith("img:")) {
            // Wenn die Antwort ein Bild ist
            const imgSrc = response.replace("img:", "").trim(); // Bild-URL extrahieren
            addImageToChat("bot-message", imgSrc); // Bild hinzufügen
        } else {
            addMessageToChat("bot-message", response);
        }
    }, 750);s
}

const responses = [
    {
        keywords: [["test", "img"]],
        response: "img: WINlogo.png"
    },
    {
        keywords: [["requirement", "documents"], ["needed", "documents"]],
        response: "The following documents are required for the application and need to be provided as PDF-files in the application portal: Copy of your undergraduate degree or recent statement of grades from the examination office together with an official translation (either English or German), Copy of your secondary studies (High school degree and transcript) plus an official translation (either English or German), Your Curriculum Vitae (CV) in English in tabular form, Proof of your English language skills (a regular copy or original certificate), Proof of practical experience if available (copy of contract or letter of recommendation), Proof of further language skills if available (official language certificate), Applicants from China, India, Vietnam, and Mongolia will have to include APS certification."
    },
    {
        keywords: [["contact"], ["email"], ["telephone"], ["call", "questions"]],
        response: "If I cannot answer your questions, David Horneber can help you with any further questions " +
        'by emailing <a href="mailto:studium-iis@fau.de?subject=Questions concerning IIS-Application" >studium-iis@fau.de</a> ' +        
        'or calling </strong> <a href="tel:+49911530296475">+49 911 5302-96475</a>. ' +
        "Office hours are Tuesday 10:00 - 11:30."
    },
    {
        keywords: [["apply", "where"], ["apply", "online"], ["application", "submit"], ["application", "send"]],
        response: "Applications for the IIS program have to be submitted online via the campo application portal. During the online application process, you are requested to upload your application documents to the upload section as a PDF file. There is no need to send application documents by post."
    },
    {
        keywords: [["fau", "student", "application", "bachelor"], ["fau", "studying", "application", "bachelor"]],
        response: "Application for FAU students is the same as for all other applicants. You have to follow all official steps to apply for the Master in International Information Systems."
    },
    {
        keywords: [["abitur"], ["high", "school", "certificate"]],
        response: "An Abitur/high school certificate is required and has to be submitted for the application"
    },
    {
        keywords: [["GRE"], ["GMAT"]],
        response: "GRE or GMAT are not required."
    },
    {
        keywords: [["statement", "grades"], ["grades", "document"]],
        response: "The statement of grades must be an official document. The document can be an original or a certified copy."
    },
    {
        keywords: [["english", "test", "deadline"]],
        response: "No, the submission of the test results as part of the offline application (before the deadline) is mandatory.."
    },
    {
        keywords: [["proof", "english", "education",]],
        response: "Yes, all applicants must submit an official proof of their English language skills as compulsory part of their application. Exceptions only apply to students whose university entrance qualification (Abitur / high school diploma) was obtained in the USA, Canada, Australia, New Zealand, Ireland, or the United Kingdom. All other applicants, including those from FAU, do need to provide a certificate, irrespective of the instruction language in their former school or university."
    },
    {
        keywords: [["application", "language"], ["application", "english"], ["application", "german"]],
        response: "Your application package documents can be either in German or in English. The curriculum vitae must be in English."
    },
    {
        keywords: [["summer", "start"], ["winter", "start"], ["programm", "start"], ["programm", "begin"]],
        response: "The program begins each winter semester (usually in October)."
    },
    {
        keywords: [["decision", "criteria"], ["decision-making", "criteria"], ["decision", "accept"]],
        response: "The final decision to accept a student is based on their application (average grades, study background, practical experience)."
    },
    {
        keywords: [["degree", "kind"], ["degree", "type"], ["degree", "start"], ["programm", "begin"]],
        response: "Applicants must have successfully completed an undergraduate degree preferably with a focus in business or IT. Applicants with other academic backgrounds may also be considered. Some 3-year bachelor degrees are accepted, others not. This is evaluated by the Master Office which receives your documents. However, they don’t offer pre-evaluation. This means you need to apply and send all your documents before they can give an assessment of your degree."
    },
    {
        keywords: [["presentation", "when"],],
        response: "Not all applicants are invited to conduct a professional presentation. If you need to conduct a presentation, we will get in touch with you via email and send you an invitation. The language of the presentation should be English. An applicant may request to conduct the presentation in German if that is preferred. However, the Master IIS Program is mostly an English language program, therefore we do prefer to speak with the applicant in English."
    },
    {
        keywords: [["presentation", "specifics"], ["presentation", "precedur"], ["presentation", "how"]],
        response: "The presentation shall last about 10 minutes followed by a 10 minutes discussion. The topic of the presentation will be announced to the applicants at least one week before the date of the presentation together with the invitation. The presentation is intended to show that applicants have the necessary skills to study the IIS program successfully."
    },
    {
        keywords: [["Berufsakademie", "bachelor"], ["berufsakademie", "degree"]],
        response: "If the diploma achieved at a berufsakademie is certified and accredited we do accept the diploma as a valid undergraduate degree (provided that the program is accredited and recognized)."
    },
    {
        keywords: [["minimum", "requirements"], ["complete", "application"]],
        response: "A complete application does not guarantee a study place. The admission to the program is highly competitive."
    },
    {
        keywords: [["Nueremberg"], ["Erlangen"], ["Place", "programm"]],
        response: "Close to 70% of the total courses are taught in Nuremberg. The rest is taught in Erlangen."
    },
    {
        keywords: [["distance", "learning"]],
        response: "There is no possibility of distance learning."
    },
    {
        keywords: [["language", "program"], ["language", "classes"]],
        response: "The teaching language is predominantly English. All mandatory courses are taught in English. Only a few elective courses are taught in German. More information can be found in the module handbook."
    },
    {
        keywords: [["english", "test", "deadline"]],
        response: "No, the submission of the test results as part of the offline application (before the deadline) is mandatory.."
    },
    {
        keywords: [["proof", "english", "education",]],
        response: "Close to 70% of the total courses are taught in Nuremberg. The rest is taught in Erlangen."
    },
    {
        keywords: [["study", "abroad",]],
        response: "A stay abroad of at least one semester during the studies is strongly encouraged for all IIS students. Moreover, it is compulsory for all students who did not receive both their high school and undergraduate degree in a country where German is not an official language."
    },
    {
        keywords: [["scholarship",]],
        response: "We do not organize scholarships for our students. You may contact the Central Office of International Affairs from our university and ask them whether they may provide you with further information."
    },
    {
        keywords: [["responsible", "matriculation",], ["responsible", "registration",]],
        response: "The student record office (“Studierendenverwaltung”) is responsible for registration/matriculation as a student of the University of Erlangen-Nuremberg."
    },
    {
        keywords: [["tuition", "fees"]],
        response: "Information regarding tuition fee can be found at the FAU’s information portal. The master’s program has a minimum student fee of ca. EUR 140 (EUR 63 for administrative costs and EUR 77 for partial contribution for a semester ticket for transportation ) per semester since most of our programs are subsidised by the German government."
    }
];

function getBotResponse(userInput) {
    const inputWords = userInput.toLowerCase().split(" ");

    for (let item of responses) {
        for (let keywordCombination of item.keywords) {
            const matched = keywordCombination.every(keyword => 
                inputWords.some(word => levenshteinDistance(word, keyword) <= 1) // Tippfehler-Toleranz
            );
            if (matched) {
                return item.response;
            }
        }
    }
    return "Sorry, I did not understand your question. Please rephrase or use the questions under FAQ! " +
        "If I cannot answer your questions, please contact the relevant office";
    }

function levenshteinDistance(a, b) {
    const matrix = [];
 
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
 
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
 
    return matrix[b.length][a.length];
}

function toggleAccordion(sectionId) {
    const section = document.getElementById(sectionId);
    const header = section.previousElementSibling;
    const isActive = section.classList.contains("active");

    // Alle aktiven Abschnitte und Header zurücksetzen
    const allSections = document.querySelectorAll(".accordion-body");
    const allHeaders = document.querySelectorAll(".accordion-header");
    allSections.forEach(sec => {
        sec.style.maxHeight = null; // Höhe zurücksetzen
        sec.classList.remove("active");
    });
    allHeaders.forEach(head => head.classList.remove("active"));

    // Wenn der aktuelle Abschnitt nicht aktiv war, aktivieren
    if (!isActive) {
        section.classList.add("active");
        header.classList.add("active");

        // Dynamische Höhe setzen
        section.style.maxHeight = section.scrollHeight + "px";
    } else {
        // Dynamische Höhe zurücksetzen
        section.style.maxHeight = null;
    }
}


addMessageToChat("bot-message", "Hello, how can I help you?");