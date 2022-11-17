import Base from './base/index';
import { OptionsType, RestOptionsType,  } from './base/type';

export * from './base/type';

export default class CWrite extends Base {
  constructor (options: OptionsType) {
    super(options);
  }

  /**
   *  清空画布
   */
  clearRect (): void {
    this.clearRectAction();
  }

  /**
   * 导出图片
   * @returns base64
   */
  canvasToImage (): string {
    return this.convertCanvasToImage();
  }

  /**
   * 刷新画布大小
   */
  refresh (): void {
    this.refreshSize();
  }

  /**
   * 重置属性
   * @param options 重置属性
   */
  resetOptions (options: RestOptionsType): void {
    this.resetOptionsAction(options);
  }

  /**
   * 初始化监听事件
   */
  initEvent (): void {
    this.initEventAction();
  }

  /**
   * 销毁监听事件
   */
  destroyed (): void {
    this.destroyedAction();
  }

  undo (): void {
    this.undoAction();
  }

  redo (): void {
    this.redoAction();
  }

}