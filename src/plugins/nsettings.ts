import { NButton, NCard, NFlex, NModal, NSpace } from 'naive-ui';

/** set naive ui component default settings */
export function setupNSetting() {
  NButton.props = {
    ...NButton.props,
    size: { type: String, default: 'small' }
  };

  NCard.props = {
    ...NCard.props,
    size: { type: String, default: 'small' }
  };

  NModal.props = {
    ...NModal.props,
    size: { type: String, default: 'small' },
    segmented: {
      type: [Boolean, Object],
      default: () => ({ content: true })
    }
  };

  NSpace.props = {
    ...NSpace.props,
    size: { type: [String, Number], default: 'small' }
  };

  NFlex.props = {
    ...NFlex.props,
    size: { type: [String, Number], default: 'small' }
  };
}
