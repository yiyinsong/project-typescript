type LayerCallbackSuccess = null|((layero: JQuery, index: number) => void);
type LayerCallbackYes = null|((index: number, layero: JQuery) => void);
type LayerCallbackCancel = null|((index: number) => boolean|void);
type LayerCallbackEnd = null|(() => void);
type LayerCallbackFull = null|((layero: JQuery) => void);
type LayerCallbackMin = null|((layero: JQuery) => void);
type LayerCallbackRestore = null|((layero: JQuery) => void);
type LayerCallbackPrompt = null|((value: string, index: number, elem: JQuery) => void);

/**
 * Layer options
 */
interface LayerOptions {
    type?: number
    title?: string|boolean|string[]
    content?: string|HTMLElement|JQuery|string[]
    skin?: string
    area?: string|string[]
    offset?: number|string|string[]
    icon?: number
    btn?: string|string[]
    closeBtn?: string|boolean
    shade?: string|boolean|(number|string)[]
    shadeClose?: boolean
    time?: number
    id?: string
    shift?: number
    maxmin?: boolean
    fix?: boolean
    scrollbar?: boolean
    maxWidth?: number
    zIndex?: number
    move?: string|boolean|HTMLElement
    moveType?: boolean
    moveOut?: boolean
    moveEnd?: null|(() => void)
    tips?: number|(number|string)[]
    tipsMore?: boolean
    success?: LayerCallbackSuccess
    yes?: LayerCallbackYes
    cancel?: LayerCallbackCancel
    end?: LayerCallbackEnd
    full?: LayerCallbackFull
    min?: LayerCallbackMin
    restore?: LayerCallbackRestore
}

interface LayerConfigOptions extends LayerOptions {
    path?: string
    extend?: string[]
}

interface LayerPromptOptions extends LayerOptions {
    formType?: number
    value?: string
    maxlength?: number
}

interface LayerTabOptions extends LayerOptions {
    tab: ({title: string, content: string})[]
}

interface LayerPhotosOptions extends LayerOptions {
    photos: LayerPhotosData|string
    tab?: (pic: LayerPhotosDataItem, layero: JQuery) => void
}

interface LayerPhotosData {
    title: string
    id: number
    start?: number
    data: LayerPhotosDataItem[]
}

interface LayerPhotosDataItem {
    alt: string
    pid?: number
    src: string
    thumb: string
}

/**
 * Layer object
 */
interface Layer {
    /**
     * 初始化全局配置
     * @param {LayerConfigOptions} options
     */
    config(options: LayerConfigOptions): void;
    /**
     * 初始化就绪
     * @param {string} path
     * @param {Function} callback
     */
    ready(path: string, callback: () => void): void;
    /**
     * 初始化就绪
     * @param {Function} callback
     */
    ready(callback: () => void): void;
    /**
     * 原始核心方法
     * @param {LayerOptions} options
     */
    open(options?: LayerOptions): number;
    /**
     * 普通信息框
     * @param {string} content
     * @param {LayerOptions} options
     * @param {Function} yes
     */
    alert(content: string, options?: LayerOptions, yes?: LayerCallbackYes): number;
    /**
     * 普通信息框
     * @param {string} content
     * @param {Function} yes
     */
    alert(content: string, yes?: LayerCallbackYes): number;

    confirm(content: string, options?: LayerOptions, yes?: LayerCallbackYes, cancel?: LayerCallbackCancel): number;

    confirm(content: string, yes?: LayerCallbackYes, cancel?: LayerCallbackCancel): number;

    msg(content: string, options?: LayerOptions, end?: LayerCallbackEnd): number;

    msg(content: string, end?: LayerCallbackEnd): number;

    load(icon: number, options?: LayerOptions): number;

    tips(content: string, follow: string|this, options?: LayerOptions): number;

    close(index: number): void;

    closeAll(type?: 'dialog'|'page'|'iframe'|'loading'|'tips'): void;

    style(index: number, cssStyle: {[key: string]: string|number}): void;

    title(title: string, index: number): void;

    getChildFrame(selector: string, index: number): JQuery;

    getFrameIndex(windowName: string): number;

    iframeAuto(index: number): void;

    iframeSrc(index: number, url: string): void;

    setTop(layero: JQuery): void;

    full(): void;

    min(): void;

    restore(): void;

    prompt(options?: LayerPromptOptions, yes?: LayerCallbackPrompt): number;

    prompt(yes?: LayerCallbackPrompt): number;

    tab(options: LayerTabOptions): number;

    photos(options: LayerPhotosOptions): number;
}

declare var layer: Layer;
declare module "layer" {
    export = layer;
}