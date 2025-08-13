#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Скрипт проверки безопасности проекта
 * Сканирует файлы на наличие потенциальных секретов и уязвимостей
 */

const SENSITIVE_PATTERNS = [
  // API ключи и токены
  /sk_[a-zA-Z0-9]{20,}/g,           // Stripe secret keys
  /pk_[a-zA-Z0-9]{20,}/g,           // Public keys
  /[a-zA-Z0-9]{32,}/g,              // Длинные токены
  
  // Discord
  /discord\.com\/api\/webhooks\/\d+\/[a-zA-Z0-9_-]+/g,
  /Bot [a-zA-Z0-9_-]{24}\.[a-zA-Z0-9_-]{6}\.[a-zA-Z0-9_-]{27}/g,
  
  // Google
  /AIza[0-9A-Za-z\\-_]{35}/g,       // Google API keys
  /"type":\s*"service_account"/g,    // Service account JSON
  
  // Generic secrets
  /password["\s]*[:=]["\s]*[^"\s]+/gi,
  /secret["\s]*[:=]["\s]*[^"\s]+/gi,
  /token["\s]*[:=]["\s]*[^"\s]+/gi,
  /key["\s]*[:=]["\s]*[^"\s]+/gi,
];

const SENSITIVE_KEYWORDS = [
  'password', 'secret', 'token', 'key', 'auth', 'credential',
  'webhook', 'api_key', 'private_key', 'client_secret'
];

const EXCLUDE_DIRS = [
  'node_modules', '.git', 'dist', 'build', 'logs',
  'coverage', '.cache', '.tmp', 'tmp'
];

const EXCLUDE_FILES = [
  '.gitignore', 'package-lock.json', 'yarn.lock',
  'SECURITY.md', 'security-check.js', 'setup.js', 
  'google-setup.js', '.env.example'
];

let securityIssues = [];
let warningCount = 0;
let errorCount = 0;

function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(process.cwd(), filePath);
    
    // Проверка на подозрительные паттерны
    SENSITIVE_PATTERNS.forEach((pattern, index) => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          securityIssues.push({
            type: 'CRITICAL',
            file: relativePath,
            issue: `Potential secret found: ${match.substring(0, 20)}...`,
            line: getLineNumber(content, match)
          });
          errorCount++;
        });
      }
    });
    
    // Проверка на подозрительные ключевые слова
    SENSITIVE_KEYWORDS.forEach(keyword => {
      const regex = new RegExp(`${keyword}[\\s]*[:=][\\s]*["'][^"']+["']`, 'gi');
      const matches = content.match(regex);
      if (matches) {
        matches.forEach(match => {
          if (!match.includes('YOUR_') && !match.includes('EXAMPLE_')) {
            securityIssues.push({
              type: 'WARNING',
              file: relativePath,
              issue: `Suspicious keyword usage: ${match}`,
              line: getLineNumber(content, match)
            });
            warningCount++;
          }
        });
      }
    });
    
  } catch (error) {
    // Игнорируем ошибки чтения файлов (например, бинарные файлы)
  }
}

function getLineNumber(content, searchText) {
  const lines = content.substring(0, content.indexOf(searchText)).split('\n');
  return lines.length;
}

function scanDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(item)) {
        scanDirectory(fullPath);
      }
    } else if (stat.isFile()) {
      if (!EXCLUDE_FILES.includes(item) && 
          !item.endsWith('.log') && 
          !item.endsWith('.png') && 
          !item.endsWith('.jpg') && 
          !item.endsWith('.gif')) {
        scanFile(fullPath);
      }
    }
  });
}

function checkGitignore() {
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    securityIssues.push({
      type: 'CRITICAL',
      file: '.gitignore',
      issue: '.gitignore file not found!',
      line: 0
    });
    errorCount++;
    return;
  }
  
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
  const requiredPatterns = [
    '.env', 'credentials/', '*.log', '*.json'
  ];
  
  requiredPatterns.forEach(pattern => {
    if (!gitignoreContent.includes(pattern)) {
      securityIssues.push({
        type: 'WARNING',
        file: '.gitignore',
        issue: `Missing important pattern: ${pattern}`,
        line: 0
      });
      warningCount++;
    }
  });
}

function checkEnvironmentFiles() {
  const dangerousFiles = ['.env', 'config.json', 'secrets.json'];
  
  dangerousFiles.forEach(file => {
    if (fs.existsSync(path.join(process.cwd(), file))) {
      // Проверяем, что файл в .gitignore
      const gitignorePath = path.join(process.cwd(), '.gitignore');
      if (fs.existsSync(gitignorePath)) {
        const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
        if (!gitignoreContent.includes(file) && !gitignoreContent.includes(file.split('.')[1])) {
          securityIssues.push({
            type: 'CRITICAL',
            file: file,
            issue: `Sensitive file ${file} exists but not in .gitignore!`,
            line: 0
          });
          errorCount++;
        }
      }
    }
  });
}

function printResults() {
  console.log('\n🔍 SECURITY SCAN RESULTS\n');
  console.log('=' .repeat(50));
  
  if (securityIssues.length === 0) {
    console.log('✅ No security issues found!');
    return;
  }
  
  const criticalIssues = securityIssues.filter(issue => issue.type === 'CRITICAL');
  const warnings = securityIssues.filter(issue => issue.type === 'WARNING');
  
  if (criticalIssues.length > 0) {
    console.log('🚨 CRITICAL ISSUES:');
    criticalIssues.forEach(issue => {
      console.log(`  ❌ ${issue.file}:${issue.line} - ${issue.issue}`);
    });
    console.log();
  }
  
  if (warnings.length > 0) {
    console.log('⚠️  WARNINGS:');
    warnings.forEach(issue => {
      console.log(`  ⚠️  ${issue.file}:${issue.line} - ${issue.issue}`);
    });
    console.log();
  }
  
  console.log('=' .repeat(50));
  console.log(`📊 SUMMARY: ${errorCount} errors, ${warningCount} warnings`);
  
  if (errorCount > 0) {
    console.log('\n🔥 CRITICAL: Fix all errors before committing!');
    console.log('📚 See docs/SECURITY.md for guidance');
    process.exit(1);
  } else if (warningCount > 0) {
    console.log('\n💡 Please review warnings before proceeding');
  } else {
    console.log('\n🎉 Security scan passed!');
  }
}

// Запускаем сканирование
console.log('🔍 Starting security scan...');
console.log('📁 Scanning directory:', process.cwd());

checkGitignore();
checkEnvironmentFiles();
scanDirectory(process.cwd());

printResults();
