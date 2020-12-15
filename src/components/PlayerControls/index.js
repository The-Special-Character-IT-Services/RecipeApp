import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import VideoPause from '../../assets/icons/pause_circle_outline.svg';
import VideoPlay from '../../assets/icons/play_circle_outline.svg';
import VideoSkipBack from '../../assets/icons/fast_forward.svg';
import VideoSkipForward from '../../assets/icons/fast_rewind.svg';
import VideoPrevious from '../../assets/icons/replay.svg';
import VideoNext from '../../assets/icons/forward.svg';

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 3,
  },
  touchable: {
    padding: 5,
  },
  touchableDisabled: {
    opacity: 0.3,
  },
});

const PlayerControls = ({
  playing,
  showPreviousAndNext,
  showSkip,
  previousDisabled,
  nextDisabled,
  onPlay,
  onPause,
  skipForwards,
  skipBackwards,
  onNext,
  onPrevious,
}) => (
  <View style={styles.wrapper}>
    {showPreviousAndNext && (
      <TouchableOpacity
        style={[styles.touchable, previousDisabled && styles.touchableDisabled]}
        onPress={onPrevious}
        disabled={previousDisabled}>
        <VideoPrevious />
      </TouchableOpacity>
    )}

    {showSkip && (
      <TouchableOpacity style={styles.touchable} onPress={skipBackwards}>
        <VideoSkipBack />
      </TouchableOpacity>
    )}

    <TouchableOpacity style={styles.touchable} onPress={playing ? onPause : onPlay}>
      {playing ? <VideoPause /> : <VideoPlay />}
    </TouchableOpacity>

    {showSkip && (
      <TouchableOpacity style={styles.touchable} onPress={skipForwards}>
        <VideoSkipForward />
      </TouchableOpacity>
    )}

    {showPreviousAndNext && (
      <TouchableOpacity
        style={[styles.touchable, nextDisabled && styles.touchableDisabled]}
        onPress={onNext}
        disabled={nextDisabled}>
        <VideoNext />
      </TouchableOpacity>
    )}
  </View>
);

PlayerControls.propTypes = {
  playing: PropTypes.bool.isRequired,
  showPreviousAndNext: PropTypes.bool.isRequired,
  showSkip: PropTypes.func.isRequired,
  previousDisabled: PropTypes.func.isRequired,
  nextDisabled: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  skipForwards: PropTypes.func.isRequired,
  skipBackwards: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};

export default PlayerControls;
