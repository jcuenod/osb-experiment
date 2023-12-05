const getColor = (color1: string, color2: string, percent: number) => {
    const color1Arr = color1.replace('rgb(', '').replace(')', '').split(',');
    const color2Arr = color2.replace('rgb(', '').replace(')', '').split(',');
    const colorArr = [];
    for (let i = 0; i < 3; i++) {
        colorArr.push(Math.round(parseInt(color1Arr[i]) + (parseInt(color2Arr[i]) - parseInt(color1Arr[i])) * percent));
    }
    return `rgb(${colorArr.join(',')})`;

}

type DrawParams = {
    canvas: HTMLCanvasElement
    buffer: AudioBuffer
    barWidth: number
    barSpacing: number
    color1: string
    color2: string
}
export const renderWaveformToCanvas = ({
    canvas,
    buffer,
    barWidth,
    barSpacing,
    color1,
    color2,
}: DrawParams) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('canvas context is null');
        return;
    }
    const width = canvas.width;
    const height = canvas.height;

    const data = buffer.getChannelData(0);
    const numberOfBars = Math.floor((width - barWidth) / (barWidth + barSpacing)) + 1;
    const dataStepSize = Math.floor(data.length / numberOfBars);

    for (let i = 0; i <= numberOfBars; i++) {
        const { max, min } = data.slice(i * dataStepSize, (i + 1) * dataStepSize).reduce((acc, cur) => {
            if (cur < acc.min) {
                acc.min = cur;
            }
            if (cur > acc.max) {
                acc.max = cur;
            }
            return acc;
        }, { min: 1.0, max: -1.0 });
        const barHeight = Math.max(1, (max - min) * (height / 2));
        const barTop = height / 2 - barHeight / 2;
        ctx.fillStyle = getColor(color1, color2, i / numberOfBars);
        ctx.fillRect(i * barWidth + i * barSpacing, barTop, barWidth, barHeight);
    }
}