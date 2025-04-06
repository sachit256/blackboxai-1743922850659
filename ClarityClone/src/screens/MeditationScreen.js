import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import { COLORS } from '../constants/colors';
import { FONTS, SPACING } from '../constants/fonts';

const { width } = Dimensions.get('window');

const meditationVideos = [
  {
    id: '1',
    title: 'Morning Meditation',
    duration: '10 min',
    instructor: 'Sarah Johnson',
    thumbnail: 'https://example.com/thumbnail1.jpg', // Replace with actual thumbnail URL
    videoUrl: 'https://example.com/video1.mp4', // Replace with actual video URL
  },
  {
    id: '2',
    title: 'Stress Relief',
    duration: '15 min',
    instructor: 'Michael Chen',
    thumbnail: 'https://example.com/thumbnail2.jpg',
    videoUrl: 'https://example.com/video2.mp4',
  },
  // Add more meditation videos as needed
];

const VideoPlayer = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const onProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  const onLoad = (data) => {
    setDuration(data.duration);
    setIsBuffering(false);
  };

  const onBuffer = ({ isBuffering }) => {
    setIsBuffering(isBuffering);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.videoContainer}>
      <Video
        ref={videoRef}
        source={{ uri: videoUrl }}
        style={styles.video}
        paused={!isPlaying}
        onProgress={onProgress}
        onLoad={onLoad}
        onBuffer={onBuffer}
        resizeMode="cover"
      />

      {isBuffering && (
        <View style={styles.bufferingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}

      <View style={styles.controls}>
        <TouchableOpacity onPress={togglePlayPause} style={styles.playPauseButton}>
          <Text style={styles.playPauseIcon}>{isPlaying ? '⏸' : '▶️'}</Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View 
            style={[
              styles.progressBar,
              { width: `${(currentTime / duration) * 100}%` }
            ]}
          />
        </View>

        <Text style={styles.timeText}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Text>
      </View>
    </View>
  );
};

const MeditationScreen = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <View style={styles.container}>
      {selectedVideo ? (
        <>
          <VideoPlayer videoUrl={selectedVideo.videoUrl} />
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle}>{selectedVideo.title}</Text>
            <Text style={styles.videoInstructor}>by {selectedVideo.instructor}</Text>
          </View>
        </>
      ) : (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Guided Meditation</Text>
          <Text style={styles.welcomeText}>
            Choose from our collection of meditation sessions to begin your mindfulness journey
          </Text>
        </View>
      )}

      <ScrollView style={styles.videoList}>
        <Text style={styles.sectionTitle}>Available Sessions</Text>
        {meditationVideos.map((video) => (
          <TouchableOpacity
            key={video.id}
            style={styles.videoCard}
            onPress={() => setSelectedVideo(video)}
          >
            <View style={styles.thumbnailPlaceholder}>
              <Text style={styles.thumbnailIcon}>🧘‍♀️</Text>
            </View>
            <View style={styles.videoCardInfo}>
              <Text style={styles.videoCardTitle}>{video.title}</Text>
              <Text style={styles.videoCardInstructor}>{video.instructor}</Text>
              <Text style={styles.videoCardDuration}>{video.duration}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  welcomeContainer: {
    padding: SPACING.xl,
    backgroundColor: COLORS.white,
  },
  welcomeTitle: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  welcomeText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
  },
  videoContainer: {
    width: width,
    height: width * 9/16, // 16:9 aspect ratio
    backgroundColor: COLORS.black,
  },
  video: {
    flex: 1,
  },
  bufferingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  playPauseButton: {
    padding: SPACING.sm,
  },
  playPauseIcon: {
    fontSize: FONTS.sizes.xl,
    color: COLORS.white,
  },
  progressContainer: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: SPACING.md,
    borderRadius: 2,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  timeText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    marginLeft: SPACING.sm,
  },
  videoInfo: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  videoTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
  },
  videoInstructor: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
  videoList: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    padding: SPACING.lg,
  },
  videoCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    borderRadius: 12,
    overflow: 'hidden',
  },
  thumbnailPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailIcon: {
    fontSize: FONTS.sizes.xxl,
  },
  videoCardInfo: {
    flex: 1,
    padding: SPACING.md,
  },
  videoCardTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  videoCardInstructor: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  videoCardDuration: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: FONTS.weights.medium,
  },
});

export default MeditationScreen;