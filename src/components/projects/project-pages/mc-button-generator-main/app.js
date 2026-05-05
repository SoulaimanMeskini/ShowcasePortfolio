(function () {
	const EXPORT_SCALE = 3;

	const input = document.getElementById("button-text");
	const fitCheckbox = document.getElementById("fit-text");
	const hoverExportCheckbox = document.getElementById("export-hover");
	const previewTitle = document.getElementById("preview-title");
	const previewButton = document.getElementById("preview-button");
	const downloadBtn = document.getElementById("download-png");
	const captureTarget = document.getElementById("capture-target");
	const sizeEstimateEl = document.getElementById("size-estimate");
	const htmlOutputEl = document.getElementById("html-output");
	const cssOutputEl = document.getElementById("css-output");
	const jsOutputEl = document.getElementById("js-output");
	const copyButtons = document.querySelectorAll(".copy-btn");
	const toggleButtons = document.querySelectorAll(".toggle-btn");

	function escapeHtml(text) {
		return text
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#39;");
	}

	function getCodeSnippets() {
		const label = input.value && input.value.trim().length ? input.value : "PLAY";
		const escapedLabel = escapeHtml(label);
		const fit = fitCheckbox.checked;

		const htmlSnippet = [
			'<button class="mc-button' + (fit ? ' mc-button--fit' : "") + '">',
			'  <span class="title">' + escapedLabel + "</span>",
			"</button>",
		].join("\n");

		const cssSnippet = [
			".mc-button {",
			"  --btn-size: 30pt;",
			"  height: var(--btn-size);",
			"  width: calc(var(--btn-size) * 10);",
			"  background-color: #999;",
			"  background-image: url('bgbtn.png');",
			"  background-size: cover;",
			"  background-repeat: no-repeat;",
			"  border: 2px solid #000;",
			"  overflow: hidden;",
			"  white-space: nowrap;",
			"  image-rendering: pixelated;",
			"}",
			"",
			".mc-button--fit {",
			"  display: inline-flex;",
			"  width: max-content;",
			"  min-width: 2.25em;",
			"  background-repeat: repeat-x;",
			"  background-size: auto 100%;",
			"}",
			"",
			".mc-button .title {",
			"  width: 100%;",
			"  height: 100%;",
			"  display: flex;",
			"  justify-content: center;",
			"  align-items: center;",
			"  padding-bottom: 0.3em;",
			"  color: #ddd;",
			"  text-shadow: 2px 2px #000a;",
			"  box-shadow: inset -2px -4px #0006, inset 2px 2px #fff7;",
			"}",
			"",
			".mc-button:hover .title {",
			"  background-color: rgba(100, 100, 255, 0.45);",
			"  text-shadow: 2px 2px #202013cc;",
			"  color: #ffffa0;",
			"}",
		].join("\n");

		const jsSnippet = [
			"const mcButton = document.querySelector('.mc-button');",
			"const mcTitle = mcButton.querySelector('.title');",
			"// Update text dynamically",
			"function setMinecraftButtonText(text) {",
			"  mcTitle.textContent = text && text.trim().length ? text : 'PLAY';",
			"}",
			"",
			"// Example:",
			"setMinecraftButtonText('" + label.replace(/'/g, "\\'") + "');",
		].join("\n");

		return { htmlSnippet, cssSnippet, jsSnippet };
	}

	function updateCodeSnippets() {
		const snippets = getCodeSnippets();
		htmlOutputEl.textContent = snippets.htmlSnippet;
		cssOutputEl.textContent = snippets.cssSnippet;
		jsOutputEl.textContent = snippets.jsSnippet;
	}

	async function copySnippet(targetId, buttonEl) {
		const target = document.getElementById(targetId);
		if (!target) {
			return;
		}
		try {
			await navigator.clipboard.writeText(target.textContent || "");
			const original = buttonEl.textContent;
			buttonEl.textContent = "Copied!";
			setTimeout(function () {
				buttonEl.textContent = original;
			}, 1200);
		} catch (error) {
			console.error(error);
			alert("Copy failed. Please copy manually from the code block.");
		}
	}

	function formatBytes(bytes) {
		if (bytes < 1024) {
			return bytes + " B";
		}
		if (bytes < 1024 * 1024) {
			return (bytes / 1024).toFixed(1) + " KB";
		}
		return (bytes / (1024 * 1024)).toFixed(1) + " MB";
	}

	/** Heuristic: flat-ish UI PNGs often land ~0.06–0.12 B per raw pixel at 3× scale */
	function updateSizeEstimate() {
		const w = Math.max(1, Math.round(captureTarget.offsetWidth));
		const h = Math.max(1, Math.round(captureTarget.offsetHeight));
		const rawPixels = w * h * EXPORT_SCALE * EXPORT_SCALE;
		const estBytes = Math.round(rawPixels * 0.09);
		sizeEstimateEl.textContent =
			"Estimated PNG: ~" +
			formatBytes(estBytes) +
			" · " +
			w +
			"×" +
			h +
			" px (×" +
			EXPORT_SCALE +
			" export). Actual size varies with text and colors.";
	}

	function syncPreview() {
		const v = input.value;
		previewTitle.textContent = v.length ? v : "\u00A0";
	}

	function syncLayoutMode() {
		const fit = fitCheckbox.checked;
		captureTarget.classList.toggle("capture-target--fit", fit);
		previewButton.classList.toggle("mc-button--fit", fit);
		previewButton.classList.toggle("full", !fit);
	}

	function scheduleEstimate() {
		requestAnimationFrame(updateSizeEstimate);
	}

	input.addEventListener("input", function () {
		syncPreview();
		updateCodeSnippets();
		scheduleEstimate();
	});
	fitCheckbox.addEventListener("change", function () {
		syncLayoutMode();
		updateCodeSnippets();
		scheduleEstimate();
	});

	if (typeof ResizeObserver !== "undefined") {
		new ResizeObserver(scheduleEstimate).observe(captureTarget);
	}
	window.addEventListener("resize", scheduleEstimate);

	syncPreview();
	syncLayoutMode();
	updateCodeSnippets();
	scheduleEstimate();

	copyButtons.forEach(function (button) {
		button.addEventListener("click", function () {
			const targetId = button.getAttribute("data-copy-target");
			copySnippet(targetId, button);
		});
	});

	toggleButtons.forEach(function (button) {
		button.addEventListener("click", function () {
			const targetId = button.getAttribute("data-toggle-target");
			const target = document.getElementById(targetId);
			if (!target) {
				return;
			}
			const card = target.closest(".code-card");
			if (!card) {
				return;
			}
			const isCollapsed = card.classList.toggle("code-card--collapsed");
			button.textContent = isCollapsed ? "Expand" : "Minimize";
		});
	});

	// Enforce collapsed state on initial load so no snippet text peeks through.
	toggleButtons.forEach(function (button) {
		const targetId = button.getAttribute("data-toggle-target");
		const target = document.getElementById(targetId);
		const card = target ? target.closest(".code-card") : null;
		if (card) {
			card.classList.add("code-card--collapsed");
			button.textContent = "Expand";
		}
	});

	downloadBtn.addEventListener("click", async function () {
		if (typeof html2canvas !== "function") {
			alert("Could not load the image export library. Check your network and reload.");
			return;
		}

		await document.fonts.ready;

		const useHoverLook = hoverExportCheckbox.checked;
		if (useHoverLook) {
			previewButton.classList.add("is-export-hover");
		}

		await new Promise(function (resolve) {
			requestAnimationFrame(function () {
				requestAnimationFrame(resolve);
			});
		});

		downloadBtn.disabled = true;
		try {
			const canvas = await html2canvas(captureTarget, {
				scale: EXPORT_SCALE,
				backgroundColor: null,
				useCORS: true,
				logging: false,
				width: captureTarget.offsetWidth,
				height: captureTarget.offsetHeight,
			});

			const link = document.createElement("a");
			link.download = "minecraft-button.png";
			link.href = canvas.toDataURL("image/png");
			link.click();
		} catch (err) {
			console.error(err);
			alert("Export failed. If the background image blocked loading, try again online.");
		} finally {
			previewButton.classList.remove("is-export-hover");
			downloadBtn.disabled = false;
		}
	});
})();
