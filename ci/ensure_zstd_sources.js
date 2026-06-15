// Copyright (c) 2026 Lubor Illek.
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const ZSTD_TAG = 'v1.5.7';
const ZSTD_GIT_URL = 'https://github.com/facebook/zstd.git';

const rootDir = path.join(__dirname, '..');
const zstdDir = path.join(rootDir, 'deps', 'zstd');
const requiredSourceFile = path.join(zstdDir, 'lib', 'common', 'debug.c');

function zstdSourcesPresent() {
  return fs.existsSync(requiredSourceFile);
}

function ensureZstdSources() {
  if(zstdSourcesPresent()) {
    return;
  }

  console.warn('[zstd-napi] Zstandard sources are missing, fetching them...');

  const depsDir = path.join(rootDir, 'deps');
  fs.mkdirSync(depsDir, { recursive: true });

  if(fs.existsSync(zstdDir)) {
    fs.rmSync(zstdDir, { recursive: true, force: true });
  }

  execFileSync('git', ['clone', '--depth', '1', '--branch', ZSTD_TAG, ZSTD_GIT_URL, zstdDir], {
    stdio: 'inherit',
  });

  if(!zstdSourcesPresent()) {
    throw new Error(`[zstd-napi] Missing expected file after clone: ${requiredSourceFile}`);
  }
}

ensureZstdSources();
