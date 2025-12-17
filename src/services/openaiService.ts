import axios from 'axios';

const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE'; // Replace with your actual key
const OPENAI_API_URL = 'https://api.openai.com/v1/audio/transcriptions';

export interface TranscriptionResponse {
  text: string;
}

export const transcribeAudio = async (audioUri: string): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: audioUri,
      type: 'audio/m4a',
      name: 'audio.m4a',
    } as any);
    formData.append('model', 'whisper-1');

    const response = await axios.post<TranscriptionResponse>(
      OPENAI_API_URL,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data.text;
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Failed to transcribe audio');
  }
};