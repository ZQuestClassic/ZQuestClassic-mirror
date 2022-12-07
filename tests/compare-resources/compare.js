const tracksEl = find('.snapshot-tracks');
const frameViewEl = find('.frame-view');
const titleEl = find('.replay-title');

let tracks = [];
/** @type {Array<{frame: number, snapshots: Array<{url: string, frame: number, unexpected: boolean}>, tracks: number[]}>} */
let trackFrames = [];
let frameViewFrameIndex = -1;
let frameViewTrackIndex = -1;

/**
 * @param {string} query
 * @param {HTMLElement=} rootEl 
 * @return {HTMLElement}
 */
function find(query, rootEl = document.documentElement) {
    const el = rootEl.querySelector(query);
    if (!el) throw new Error(`missing element ${query}`);
    return el;
}

/**
 * @param {string} query
 * @param {HTMLElement=} rootEl 
 * @return {HTMLElement[]}
 */
function findAll(query, rootEl = document.documentElement) {
    return [...rootEl.querySelectorAll(query)];
}

function setTitle(title) {
    titleEl.textContent = title;
}

function getOptions() {
    return {
        replay: find('.select__replays select').value,
        showOnlyUnexpectedFrames: find('.label__expected-filter input').checked,
        showDiff: find('.label__diff input').checked,
    };
}

function showOptions(view) {
    for (let el of findAll('.toolbar__options > *')) {
        const forView = el.dataset['view'];
        el.classList.toggle('hidden', forView && view !== forView);
    }
}

function findNextFrame(delta) {
    const currentIndex = trackFrames.findIndex(f => f.frame === frameViewFrameIndex);
    const nextIndex = currentIndex + delta;
    if (nextIndex < 0 || nextIndex >= trackFrames.length) return -1;

    return trackFrames[nextIndex].frame;
}

function init() {
    console.log({ data });

    function onToggleUnexpectedFilter() {
        renderTracks(getOptions());
    }

    function onToggleDiff() {
        find('.label__diff input').checked = !find('.label__diff input').checked;
        showFrameView(frameViewFrameIndex, frameViewTrackIndex, getOptions());
    }

    function onSwitchTrack(delta) {
        let nextTrackIndex = frameViewTrackIndex + delta;
        if (nextTrackIndex < 0) nextTrackIndex = tracks.length - 1;
        if (nextTrackIndex >= tracks.length) nextTrackIndex = 0;
        showFrameView(frameViewFrameIndex, nextTrackIndex, getOptions());
    }

    function onSwitchFrame(delta) {
        const nextFrameIndex = findNextFrame(delta);
        if (nextFrameIndex === -1) return;

        showFrameView(nextFrameIndex, frameViewTrackIndex, getOptions());
    }

    find('.label__expected-filter input').addEventListener('change', onToggleUnexpectedFilter);
    find('.label__diff input').addEventListener('change', onToggleDiff);

    document.addEventListener('keypress', (e) => {
        if (frameViewFrameIndex !== -1) {
            if (e.key === ',') {
                onSwitchTrack(-1);
            }
            if (e.key === '.') {
                onSwitchTrack(1);
            }
            if (e.key === 'd') {
                onToggleDiff();
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        if (frameViewFrameIndex !== -1) {
            if (e.code === 'ArrowLeft') {
                onSwitchFrame(-1);
            }
            if (e.code === 'ArrowRight') {
                onSwitchFrame(1);
            }
            if (e.code === 'ArrowUp') {
                onSwitchTrack(-1);
            }
            if (e.code === 'ArrowDown') {
                onSwitchTrack(1);
            }
            if (e.code === 'Escape') {
                hideFrameView();
            }
        }
    });

    tracksEl.addEventListener('click', (e) => {
        if (e.target.className !== 'track-frame__image') return;

        const containerEl = e.target.closest('.track-frame-container');
        const trackFrameEl = e.target.closest('.track-frame');
        const frameIndex = Number(containerEl.dataset['frame']);
        const trackIndex = Number(trackFrameEl.dataset['track']);
        showFrameView(frameIndex, trackIndex, getOptions());
    });

    find('.frame-view').addEventListener('click', () => {
        hideFrameView();
    });

    const replays = [...new Set(data.map(d => d.replay))];
    const selectEl = find('.select__replays select');
    for (const replay of replays) {
        const el = document.createElement('option');
        el.value = el.textContent = replay;
        selectEl.append(el);
    }

    selectEl.addEventListener('change', () => renderTracks(getOptions()));
    renderTracks(getOptions());
}

/**
 * @param {ReturnType<typeof getOptions>} options
 */
function renderTracks(options) {
    showOptions('tracks');
    tracks = data.filter(d => d.replay === options.replay);

    let minFrame = tracks[0].snapshots[0].frame;
    let maxFrame = tracks[0].snapshots[0].frame;
    for (const track of tracks) {
        minFrame = Math.min(minFrame, track.snapshots[track.snapshots.length - 1].frame);
        maxFrame = Math.max(maxFrame, track.snapshots[track.snapshots.length - 1].frame);
    }

    tracksEl.textContent = '';
    tracksEl.classList.remove('hidden');
    frameViewEl.classList.add('hidden');
    setTitle(options.replay);

    const trackIndicies = [];
    for (const _ of tracks) {
        trackIndicies.push(0);
    }

    trackFrames = [];

    let frame = -1;
    while (frame <= maxFrame) {
        let nextFrame = Number.POSITIVE_INFINITY;
        for (let i = 0; i < tracks.length; i++) {
            if (trackIndicies[i] >= tracks[i].snapshots.length) continue;

            if (nextFrame > tracks[i].snapshots[trackIndicies[i]].frame) {
                nextFrame = tracks[i].snapshots[trackIndicies[i]].frame;
            }
        }

        if (!Number.isFinite(nextFrame)) break;

        // At least one track has a snapshot for this frame.
        frame = nextFrame;

        trackFrames.push({ frame, snapshots: [], tracks: [] });

        for (let i = 0; i < tracks.length; i++) {
            if (trackIndicies[i] === tracks[i].snapshots.length) continue;

            if (tracks[i].snapshots[trackIndicies[i]].frame === nextFrame) {
                trackFrames[trackFrames.length - 1].snapshots.push(tracks[i].snapshots[trackIndicies[i]]);
                trackFrames[trackFrames.length - 1].tracks.push(i);
            }
        }

        // Increment track indicies.
        for (let i = 0; i < tracks.length; i++) {
            if (trackIndicies[i] === tracks[i].snapshots.length) continue;

            if (tracks[i].snapshots[trackIndicies[i]].frame === nextFrame) {
                trackIndicies[i] += 1;
            }
        }
    }

    // Render track sources.
    {
        const containerEl = document.createElement('div');
        containerEl.className = 'track-frame-container';
        tracksEl.append(containerEl);
        for (const track of tracks) {
            const el = document.createElement('div');
            el.className = 'track-frame track-frame--source';
            el.textContent = track.source;
            containerEl.append(el);
        }
    }

    if (options.showOnlyUnexpectedFrames) {
        trackFrames = trackFrames.filter(trackFrame => {
            const baselineMissing = !trackFrame.tracks.includes(0);
            return baselineMissing || trackFrame.snapshots.some((snapshot, i) => i > 0 && snapshot.unexpected);
        });
    }

    for (let i = 0; i < trackFrames.length; i++) {
        const trackFrame = trackFrames[i];

        const containerEl = document.createElement('div');
        containerEl.className = 'track-frame-container';
        containerEl.dataset['frame'] = trackFrame.frame;
        containerEl.innerHTML = `<div class='track-frame-number'>${trackFrame.frame}</div>`;
        tracksEl.append(containerEl);

        for (let j = 0; j < tracks.length; j++) {
            const index = trackFrame.tracks.indexOf(j);
            const snapshot = trackFrame.snapshots[index];
            const el = document.createElement('div');
            el.className = 'track-frame ' + (snapshot ? 'track-frame-present' : 'track-frame-missing');
            el.dataset['track'] = j;
            containerEl.append(el);

            if (snapshot) {
                el.innerHTML = `<img loading=lazy class='track-frame__image' src='${snapshot.url}'>`;
            }

            const unexpected = j > 0 && (snapshot?.unexpected || (!!snapshot !== trackFrame.tracks.includes(0)))
            {
                const statusEl = document.createElement('div');
                statusEl.className = 'track-frame ' + (unexpected ? 'track-frame__unexpected' : 'track-frame__ok');
                containerEl.append(statusEl);
            }
            if (unexpected) {
                find('.track-frame-number', containerEl).classList.add('track-frame-number--unexpected')
            }
        }

        if (i + 1 < trackFrames.length && trackFrames[i].frame + 60 < trackFrames[i + 1].frame) {
            const el = document.createElement('div');
            el.className = 'track-frame-container track-frame-container--skip';
            el.innerHTML = '<div>.</div>';
            tracksEl.append(el);
        }
    }

    console.log({ trackFrames });
}

const imagePromises = new Map();
async function loadImageFromTrack(frameIndex, trackIndex) {
    const track = tracks[trackIndex];
    const snapshot = track.snapshots.find(s => s.frame === frameIndex);
    if (!snapshot) return;

    const key = `${frameIndex},${trackIndex}`;
    let promise = imagePromises.get(key);
    if (promise) return promise;

    promise = new Promise((resolve) => {
        const img = document.createElement('img');
        img.dataset['frame'] = frameIndex;
        img.dataset['track'] = trackIndex;
        img.crossOrigin = 'Anonymous';
        img.addEventListener('load', () => resolve(img));
        img.src = snapshot.url;
    });
    imagePromises.set(key, promise);
    return promise;
}

/**
 * @param {number} frameIndex
 * @param {number} trackIndex
 * @param {ReturnType<typeof getOptions>} options
 */
async function showFrameView(frameIndex, trackIndex, options) {
    showOptions('frame');

    // TODO: do something smarter here.
    if (imagePromises.size > 500) {
        imagePromises.clear();
    }

    const selectedImg = await loadImageFromTrack(frameIndex, trackIndex);

    if (frameViewFrameIndex !== frameIndex) {
        frameViewFrameIndex = frameIndex;
        frameViewEl.innerHTML = '';

        // Only wait for the current track, but preload the rest.
        tracks.forEach((_, i) => loadImageFromTrack(frameIndex, i));

        // Also preload the neighboring frames.
        const prevFrame = findNextFrame(-1);
        if (prevFrame !== -1) tracks.forEach((_, i) => loadImageFromTrack(prevFrame, i));
        const nextFrame = findNextFrame(1);
        if (nextFrame !== -1) tracks.forEach((_, i) => loadImageFromTrack(nextFrame, i));
    }

    frameViewTrackIndex = trackIndex;

    if (selectedImg) frameViewEl.append(selectedImg);
    tracksEl.classList.add('hidden');
    frameViewEl.classList.remove('hidden');

    const parts = [
        options.replay,
        frameViewFrameIndex,
        tracks[frameViewTrackIndex].source,
        options.showDiff ? 'diff' : '',
    ];
    setTitle(parts.filter(Boolean).join(' - '));

    for (const img of findAll('img', frameViewEl)) {
        img.classList.add('hidden');
        if (img.classList.contains('diff-image')) img.remove();
    }

    function getImgData(img) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        return context.getImageData(0, 0, img.width, img.height);
    }

    function getImageFromData(imgData) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = imgData.width;
        canvas.height = imgData.height;
        ctx.putImageData(imgData, 0, 0);

        const image = new Image();
        image.src = canvas.toDataURL();
        return image;
    }

    if (options.showDiff) {
        const img1 = await loadImageFromTrack(frameIndex, 0);
        const img2 = await loadImageFromTrack(frameIndex, trackIndex);

        if (!img1 || !img2) {
            setTitle(`${titleEl.textContent} (missing)`);
            return;
        }

        const imgData1 = getImgData(img1);
        const imgData2 = getImgData(img2);
        const diffImgData = getImgData(new Image(imgData1.width, imgData2.height));
        pixelmatch(imgData1.data, imgData2.data, diffImgData.data, imgData1.width, imgData1.height, { threshold: 0 });

        const diffImg = getImageFromData(diffImgData);
        frameViewEl.append(diffImg);
        diffImg.classList = 'diff-image';
    } else {
        if (selectedImg) {
            selectedImg.classList.remove('hidden');
        } else {
            setTitle(`${titleEl.textContent} (missing)`);
        }
    }
}

async function hideFrameView() {
    tracksEl.classList.remove('hidden');
    frameViewEl.classList.add('hidden');
    frameViewFrameIndex = -1;
    frameViewTrackIndex = -1;
    setTitle(getOptions().replay);
    showOptions('tracks');
}

init();
