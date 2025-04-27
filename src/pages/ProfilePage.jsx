import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const BADGE_THRESHOLDS = {
    100: "Beginner Badge 🥉",
    250: "Intermediate Badge 🥈",
    500: "Advanced Badge 🥇",
    1000: "Expert Badge 🏆"
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/signup');
      return;
    }

    const fetchProgress = async () => {
      try {
        const xpRes = await fetch(`https://hack-hack-2025-production.up.railway.app/progress/${userId}`);
        const xpData = await xpRes.json();
        setXp(xpData.xp || 0);

        const badgeRes = await fetch(`https://hack-hack-2025-production.up.railway.app/progress/badges/${userId}`);
        const badgeData = await badgeRes.json();
        setBadges(badgeData || []);
      } catch (error) {
        console.error('Error fetching progress:', error);
        alert('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [navigate]);

  const nextBadge = () => {
    for (const threshold of Object.keys(BADGE_THRESHOLDS)) {
      if (xp < threshold) {
        return { needed: threshold - xp, badge: BADGE_THRESHOLDS[threshold] };
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Your Progress</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="mb-6 text-center">
              <h3 className="text-xl font-semibold">Current XP:</h3>
              <p className="text-blue-600 text-2xl">{xp} XP</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Badges Earned:</h3>
              {badges.length > 0 ? (
                <ul className="list-disc ml-6 text-green-700">
                  {badges.map((badge, idx) => (
                    <li key={idx}>{badge.badge_name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No badges earned yet.</p>
              )}
            </div>

            {nextBadge() && (
              <div className="mb-6 text-center">
                <h3 className="text-xl font-semibold">Next Reward:</h3>
                <p className="text-gray-700">
                  {nextBadge().needed} more XP to unlock <strong>{nextBadge().badge}</strong>
                </p>
              </div>
            )}

            {/* Optional: Add completed chapters here if you want later */}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
