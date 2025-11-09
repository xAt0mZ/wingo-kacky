import { axios } from '@/axios';
import { Paths } from '@/router';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

const TWITCH_CLIENT_ID = import.meta.env.VITE_TWITCH_CLIENT_ID;
const REDIRECT_URI = `${window.location.origin}/#${Paths.CALLBACK}`; // Current app URL

type User = {
  broadcaster_type: string;
  created_at: string;
  description: string;
  display_name: string;
  id: string;
  login: string;
  offline_image_url: string;
  profile_image_url: string;
  type: string;
  view_count: number;
};

type State = {
  user: User | null;
  token: string | null;
  logout: () => void;
  getOAuthURL: () => string;
  handleOAuthCallback: (hash: string) => void;
};

// Auth Context
const AuthContext = createContext<State | null>(null);

export function userOAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('userOAuthContext must be used within OAuthProvider');
  }
  return context;
}

const twitchTokenKey = 'twitch_token';
const oauthStateKey = 'oauth_state';

// Auth Provider Component
export function OAuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem(twitchTokenKey);
    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
    }
  }, []);

  // Handle OAuth callback
  const handleOAuthCallback = useCallback((hash: string) => {
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const returnedState = params.get('state');

    // Verify state parameter to prevent CSRF attacks
    const storedState = sessionStorage.getItem(oauthStateKey);
    if (!storedState || !returnedState || storedState !== returnedState) {
      console.error('State parameter mismatch - possible CSRF attack');
      alert('Security error: Invalid authentication attempt detected');
      window.history.replaceState(null, '', window.location.pathname);
      return;
    }

    if (accessToken) {
      sessionStorage.removeItem(oauthStateKey);
      localStorage.setItem(twitchTokenKey, accessToken);
      setToken(accessToken);
      fetchUserData(accessToken);
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  async function fetchUserData(accessToken: string) {
    try {
      const user = await getUserDetails(accessToken);
      setUser(user);
    } catch (error) {
      console.error(error);
      cleanStorage();
    }
  }

  function cleanStorage() {
    localStorage.removeItem(twitchTokenKey);
    setToken(null);
    setUser(null);
  }

  async function logout() {
    if (token) {
      await invalidateToken(token);
    }
    cleanStorage();
  }

  function getOAuthURL() {
    const state = uuidv4();
    sessionStorage.setItem(oauthStateKey, state);

    return `https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI,
    )}&response_type=token&state=${state}`;
  }

  const value = {
    user,
    token,
    logout,
    getOAuthURL,
    handleOAuthCallback,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

async function getUserDetails(token: string) {
  const { data } = await axios.get<{ data: User[] }>(
    'https://api.twitch.tv/helix/users',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-Id': TWITCH_CLIENT_ID,
      },
    },
  );
  return data.data[0];
}

async function invalidateToken(token: string) {
  return axios.post(
    `https://id.twitch.tv/oauth2/revoke?client_id=${TWITCH_CLIENT_ID}&token=${token}`,
  );
}
