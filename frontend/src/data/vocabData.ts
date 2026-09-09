export interface VocabItem {
    id: string;
    word: string;
    phonetic: string;
    partOfSpeech: string;
    englishMeaning: string;
    hindiMeaning: string;
    marathiMeaning: string;
    synonyms: string[];
    antonyms: string[];
    exampleSentence: string;
    examContext: string;
    quizOptions: string[];
    quizAnswerIndex: number;
}

export const PRACTICAL_EXAM_VOCAB_BANK: VocabItem[] = [
    {
        id: 'v-1',
        word: 'Stringent',
        phonetic: '/ˈstrɪn.dʒənt/',
        partOfSpeech: 'Adjective',
        englishMeaning: '(Of rules, conditions, or requirements) extremely strict, precise, and exacting.',
        hindiMeaning: 'कड़ा, सख्त, कठोर, नियमनिष्ठ',
        marathiMeaning: 'कडक, अतिशय कडक, नियमांचे तंतोतंत पालन करणारे',
        synonyms: ['Rigorous', 'Strict', 'Draconian', 'Inflexible', 'Exact'],
        antonyms: ['Lax', 'Lenient', 'Flexible', 'Permissive'],
        exampleSentence: 'The Central Pollution Control Board issued stringent norms to control industrial emissions in urban sectors.',
        examContext: 'High-frequency term in Hindu Editorials concerning governance, environmental legislation, and regulatory compliance (UPSC Mains GS-2 / Bank PO English).',
        quizOptions: [
            'Extremely relaxed or casual in nature',
            'Strict, precise, and exacting',
            'Temporary and easily changeable',
            'Unclear or ambiguous in definition'
        ],
        quizAnswerIndex: 1
    },
    {
        id: 'v-2',
        word: 'Ameliorate',
        phonetic: '/əˈmiː.li.ə.reɪt/',
        partOfSpeech: 'Verb',
        englishMeaning: 'To make something bad, unsatisfactory, or difficult significantly better.',
        hindiMeaning: 'सुधारना, बेहतर बनाना, स्थिति में सुधार लाना',
        marathiMeaning: 'सुधारणे, परिस्थिती अधिक चांगली करणे',
        synonyms: ['Improve', 'Enhance', 'Upgrade', 'Mitigate', 'Alleviate'],
        antonyms: ['Worsen', 'Aggravate', 'Exacerbate', 'Deteriorate'],
        exampleSentence: 'Targeted agricultural subsidies aim to ameliorate rural distress caused by erratic monsoon cycles.',
        examContext: 'Frequently cited in economic development essays, poverty alleviation schemes, and reading comprehension passages (MPSC / UPSC / SSC CGL).',
        quizOptions: [
            'To make a bad situation worse',
            'To ignore an existing issue',
            'To make something bad or difficult better',
            'To divide into smaller parts'
        ],
        quizAnswerIndex: 2
    },
    {
        id: 'v-3',
        word: 'Impetus',
        phonetic: '/ˈɪm.pɪ.təs/',
        partOfSpeech: 'Noun',
        englishMeaning: 'A driving force, impulse, or momentum that accelerates a process or activity.',
        hindiMeaning: 'प्रोत्साहन, प्रेरणा, गति, संवेग',
        marathiMeaning: 'चालना, प्रोत्साहन, गती देणारा घटक',
        synonyms: ['Stimulus', 'Catalyst', 'Motivation', 'Boost', 'Momentum'],
        antonyms: ['Hindrance', 'Deterrent', 'Obstacle', 'Check'],
        exampleSentence: 'The push for digital infrastructure gave a massive impetus to fintech adoption across tier-2 cities.',
        examContext: 'Commonly used in fiscal policy discussions, infrastructure development analysis, and editorial summaries.',
        quizOptions: [
            'A force that slows down progress',
            'A driving force or catalyst that accelerates a process',
            'A financial loss incurred unexpectedly',
            'A legal prohibition or ban'
        ],
        quizAnswerIndex: 1
    },
    {
        id: 'v-4',
        word: 'Prudent',
        phonetic: '/ˈpruː.dənt/',
        partOfSpeech: 'Adjective',
        englishMeaning: 'Acting with or showing care, wisdom, and thought for the future.',
        hindiMeaning: 'विवेकी, समझदार, सावधान, मितव्ययी',
        marathiMeaning: 'विवेकी, हुशार, भविष्याचा विचार करून वागणारा',
        synonyms: ['Judicious', 'Wise', 'Sagacious', 'Cautious', 'Discreet'],
        antonyms: ['Imprudent', 'Reckless', 'Foolish', 'Rash'],
        exampleSentence: 'Prudent fiscal management enabled the state to maintain low debt ratios despite global headwinds.',
        examContext: 'Essential vocabulary for economic essays, financial regulation topics, and vocabulary sentence-filler questions.',
        quizOptions: [
            'Reckless and impulsive',
            'Wise, careful, and showing good judgment',
            'Expensive and extravagant',
            'Slow and indecisive'
        ],
        quizAnswerIndex: 1
    },
    {
        id: 'v-5',
        word: 'Efficacy',
        phonetic: '/ˈef.ɪ.kə.si/',
        partOfSpeech: 'Noun',
        englishMeaning: 'The ability to produce a desired or intended result; effectiveness.',
        hindiMeaning: 'प्रभावकारिता, क्षमता, असर',
        marathiMeaning: 'कार्यक्षमता, इष्ट परिणाम साधण्याची क्षमता',
        synonyms: ['Effectiveness', 'Potency', 'Productivity', 'Success'],
        antonyms: ['Inefficacy', 'Ineffectiveness', 'Impatience'],
        exampleSentence: 'Clinical trials demonstrated the high efficacy of the newly developed indigenous vaccine.',
        examContext: 'Used extensively in health policy reporting, administrative evaluations, and scientific reading comprehensions.',
        quizOptions: [
            'The speed of execution',
            'The inability to achieve goals',
            'The power or capacity to produce a desired effect',
            'The total cost of production'
        ],
        quizAnswerIndex: 2
    }
];
