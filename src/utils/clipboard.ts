import { useClipboard } from '@vueuse/core';

const { copy: copyToClipboard, isSupported } = useClipboard();

export async function copy(text: string) {
  if (!isSupported) {
    window.$message?.error('您的浏览器不支持Clipboard API');
    return;
  }

  await copyToClipboard(text);
  window.$message?.success(`复制成功：${text}`);
}
