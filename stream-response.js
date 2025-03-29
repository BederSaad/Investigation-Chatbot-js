const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "YOUR-API-HERE";

const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const resultText = document.getElementById("resultText");
const sentimentIndicator = document.getElementById("sentimentIndicator");

let controller = null; // Store the AbortController instance
let conversationHistory = []; // Store the conversation history
let starting = true; // Track if it's the starting message
const starting_message = "Detective Taylor focused intently on April, a pivotal suspect in the enigmatic case surrounding Yoshiko Nakamura's demise. Armed with an unyielding determination to unearth the truth, Detective Taylor steeled himself for the imminent interrogation, knowing well that his strategy demanded adaptability, incisiveness, and occasional levity. As he delved deeper into the investigation, Detective Taylor remained poised to adjust his tactics in response to April's every word, maintaining a delicate equilibrium between firmness and empathy. With each question poised, he braced himself for April's reactions, prepared to navigate the labyrinthine complexities of the interrogation with precision and wit.The primary objective of the interrogation was clear: to validate the accuracy of April's statements and unveil any concealed truths or inconsistencies. Responses consistent with established facts, offering coherent explanations, and aligning with alibis and evidence were deemed favorable. Conversely, evasive or contradictory answers, lacking logical coherence, or introducing new suspicions were met with heightened scrutiny.The interrogation style was tailored to April's responses, blending firmness and empathy, occasionally punctuated with light-hearted or humorous remarks to diffuse tension and foster candid responses. April's activities on the fateful night were under intense scrutiny to ascertain her innocence. She claimed to have attended a study group in the library from 5 PM to 7 PM, engaged in either a group project, a poetry reading, or a gym session from 8 PM to 9:45 PM, and asserted to have been en route to her dorm from the library between Ten PM and midnight.However, the discovery of Yoshiko Nakamura's body in an abandoned campus building, reported by April and her roommate, raised suspicion. April described her reaction to the grim discovery as one of shock and horror, recounting peculiar occurrences such as masked individuals and flickering lights. She pointed fingers at various individuals, including a loiterer, a former partner of the victim, a disgruntled ex-student, a contentious faculty member, and a mysterious stranger.Witnesses, including her roommate, security guard, librarian, classmate, janitor, and others, provided alibis. Correct answers would align with witness statements and security footage, while discrepancies in April's whereabouts and reactions would raise further questions.This investigation had brought to light both corroborative evidence and troubling inconsistencies, necessitating thorough scrutiny. The interrogation followed a strict format: one question at a time, awaiting April's response before proceeding. Detective Taylor adapted his approach—harsh, strict, lenient, or humorous—based on the nature of April's answers, all in the relentless pursuit of truth.Your role is to play the detective and ask question and wait for the response and adapt to it.You ask 1 question at a time and waits for apri'ls answer before asking again and whether the answwer is wrong or correct you adapt to her answer and try to figure out the Truth in a smart way and smart questioning.Your role is to role play the detective ;without adding narrative phrases also ask 1 short question at a time and adapt to the answer and ensure that april remain focused on the investigation whenever she tries to escape. Don't say the number of the question and add the number 0 after the question if the answer is wrong  based on the stroy and number 1 if the answer is Correct.";

// Function to generate response from the API
const generate = async () => {
  // Add the user's message to the conversation history
  if (starting) {
    conversationHistory.push({ role: "user", content: starting_message });
    starting = false;
  } else {
    conversationHistory.push({ role: "user", content: promptInput.value });
  }

  // Disable the generate button and enable the stop button
  generateBtn.disabled = true;
  stopBtn.disabled = false;
  resultText.innerText = "Generating...";

  // Create a new AbortController instance
  controller = new AbortController();
  const signal = controller.signal;

  try {
    // Fetch the response from the OpenAI API with the signal from AbortController
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: conversationHistory,
        max_tokens: 100,
      }),
      signal, // Pass the signal to the fetch request
    });

    const data = await response.json();
    let assistantMessage = data.choices[0].message.content;

    // Add the assistant's message to the conversation history
    conversationHistory.push({ role: "assistant", content: assistantMessage });

    // Check if the assistant's message contains "1" or "0"
    const hasOne = assistantMessage.includes("1");
    const hasZero = assistantMessage.includes("0");

    // Hide "1" and "0"
    assistantMessage = assistantMessage.replace(/1/g, "<span style='color: transparent;'>1</span>");
    assistantMessage = assistantMessage.replace(/0/g, "<span style='color: transparent;'>0</span>");

    resultText.innerHTML = assistantMessage;

    // Adjust sentiment bar based on the presence of "1" or "0"
    let currentHeight = parseFloat(sentimentIndicator.style.height);
    if (isNaN(currentHeight)) {
      currentHeight = 50; // Default to 50% if current height is not a number
    }
    if (hasOne) {
      sentimentIndicator.style.height = `${Math.max(0, currentHeight - 15)}%`;
    } else if (hasZero) {
      sentimentIndicator.style.height = `${Math.min(100, currentHeight + 15)}%`;
    }

    // Redirect based on sentiment bar height
    if (currentHeight <= 0) {
      window.location.href = "cleared.html"; // Replace with your actual URL for low sentiment
    } else if (currentHeight >= 100) {
      window.location.href = "arrested.html"; // Replace with your actual URL for high sentiment
    }

    // Clear the input field value
    promptInput.value = "";
  } catch (error) {
    // Handle fetch request errors
    if (signal.aborted) {
      resultText.innerText = "Request aborted.";
    } else {
      console.error("Error:", error);
      resultText.innerText = "Error occurred while generating.";
    }
  } finally {
    // Enable the generate button and disable the stop button
    generateBtn.disabled = false;
    stopBtn.disabled = true;
    controller = null; // Reset the AbortController instance
  }
};

// Function to stop the ongoing request
const stop = () => {
  // Abort the fetch request by calling abort() on the AbortController instance
  if (controller) {
    controller.abort();
    controller = null;
  }
};

// Automatically generate response at the start
if (starting) {
  generate();
  starting = false;
}

// Event listener for Enter key press in the input field
promptInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    generate();
  }
});

// Event listeners for buttons
generateBtn.addEventListener("click", generate);
stopBtn.addEventListener("click", stop);
