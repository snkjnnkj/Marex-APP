<template>
    <div class="wave-wrapper" style="position: absolute; bottom: -40px;">
        <svg class="wave wave1" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,30 C150,70 350,0 600,30 C850,60 1050,20 1200,30 L1200,120 L0,120 Z"
                :fill="'rgba(255,255,255,1)'" :opacity="'0.2'" />
        </svg>
        <svg class="wave wave2" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,40 C200,10 400,80 600,40 C800,0 1000,50 1200,40 L1200,120 L0,120 Z"
                :fill="'rgba(255,255,255,1)'" :opacity="'0.2'" />
        </svg>
        <svg class="wave wave1" viewBox="0 0 900 120" preserveAspectRatio="none">
            <path d="M0,30 C150,70 350,0 600,30 C850,60 1050,20 1200,30 L1200,120 L0,120 Z"
                :fill="'rgba(255,255,255,1)'" :opacity="'0.2'" />
        </svg>
    </div>
</template>

<style scoped>
.wave-wrapper
{
    position: relative;
    width: 100%;
    height: 150px;
    /* 你想要“浪”露出多少高度就调这里 */
    overflow: hidden;
}

.wave
{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200%;
    /* 放大到两倍宽度，才能循环平滑 */
    height: 100%;
    animation: move-wave 100s linear infinite;
}

/* 第二层速度可以不同，制造出“层次” */
.wave2
{
    animation-duration: 15s;
}

@keyframes move-wave
{
    from
    {
        transform: translateX(0);
    }

    to
    {
        transform: translateX(-50%);
    }
}
</style>