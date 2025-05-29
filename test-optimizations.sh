#!/bin/bash

# Portfolio Optimization Testing Script
# Tests all implemented optimizations and generates a report

echo "🚀 Marc Ràfols Portfolio - Optimization Testing"
echo "==============================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counters
TESTS_PASSED=0
TESTS_FAILED=0
TESTS_WARNING=0

# Function to print test result
print_result() {
    local test_name="$1"
    local status="$2"
    local message="$3"
    
    case $status in
        "PASS")
            echo -e "${GREEN}✅ PASS${NC} - $test_name: $message"
            ((TESTS_PASSED++))
            ;;
        "FAIL")
            echo -e "${RED}❌ FAIL${NC} - $test_name: $message"
            ((TESTS_FAILED++))
            ;;
        "WARN")
            echo -e "${YELLOW}⚠️  WARN${NC} - $test_name: $message"
            ((TESTS_WARNING++))
            ;;
        "INFO")
            echo -e "${BLUE}ℹ️  INFO${NC} - $test_name: $message"
            ;;
    esac
}

# Test 1: Check if all HTML files exist
echo "📄 Testing HTML Files..."
html_files=("index.html" "experience.html" "contact.html" "offline.html")
for file in "${html_files[@]}"; do
    if [ -f "$file" ]; then
        print_result "HTML File" "PASS" "$file exists"
    else
        print_result "HTML File" "FAIL" "$file is missing"
    fi
done

# Test 2: Check PWA files
echo ""
echo "📱 Testing PWA Components..."
pwa_files=("manifest.json" "sw.js" "assets/js/pwa.js")
for file in "${pwa_files[@]}"; do
    if [ -f "$file" ]; then
        print_result "PWA File" "PASS" "$file exists"
    else
        print_result "PWA File" "FAIL" "$file is missing"
    fi
done

# Test 3: Check JavaScript files
echo ""
echo "💻 Testing JavaScript Files..."
js_files=("assets/js/language.js" "assets/js/security.js" "assets/js/performance.js" "assets/js/animations.js" "assets/js/theme.js")
for file in "${js_files[@]}"; do
    if [ -f "$file" ]; then
        print_result "JavaScript" "PASS" "$file exists"
    else
        print_result "JavaScript" "FAIL" "$file is missing"
    fi
done

# Test 4: Check for meta tags in HTML files
echo ""
echo "🏷️  Testing Meta Tags..."
for html_file in index.html experience.html contact.html; do
    if [ -f "$html_file" ]; then
        # Check for essential meta tags
        if grep -q 'meta.*viewport' "$html_file"; then
            print_result "Meta Viewport" "PASS" "$html_file has viewport meta tag"
        else
            print_result "Meta Viewport" "FAIL" "$html_file missing viewport meta tag"
        fi
        
        if grep -q 'meta.*description' "$html_file"; then
            print_result "Meta Description" "PASS" "$html_file has description meta tag"
        else
            print_result "Meta Description" "FAIL" "$html_file missing description meta tag"
        fi
        
        if grep -q 'property="og:' "$html_file"; then
            print_result "Open Graph" "PASS" "$html_file has Open Graph tags"
        else
            print_result "Open Graph" "WARN" "$html_file missing Open Graph tags"
        fi
        
        if grep -q 'name="twitter:' "$html_file"; then
            print_result "Twitter Cards" "PASS" "$html_file has Twitter Card tags"
        else
            print_result "Twitter Cards" "WARN" "$html_file missing Twitter Card tags"
        fi
    fi
done

# Test 5: Check PWA manifest references
echo ""
echo "🔗 Testing PWA References..."
for html_file in index.html experience.html contact.html; do
    if [ -f "$html_file" ]; then
        if grep -q 'rel="manifest"' "$html_file"; then
            print_result "Manifest Link" "PASS" "$html_file references manifest.json"
        else
            print_result "Manifest Link" "FAIL" "$html_file missing manifest.json reference"
        fi
        
        if grep -q 'theme-color' "$html_file"; then
            print_result "Theme Color" "PASS" "$html_file has theme-color meta tag"
        else
            print_result "Theme Color" "WARN" "$html_file missing theme-color meta tag"
        fi
    fi
done

# Test 6: Check accessibility features
echo ""
echo "♿ Testing Accessibility Features..."
for html_file in index.html experience.html contact.html; do
    if [ -f "$html_file" ]; then
        if grep -q 'aria-' "$html_file"; then
            print_result "ARIA Attributes" "PASS" "$html_file has ARIA attributes"
        else
            print_result "ARIA Attributes" "WARN" "$html_file missing ARIA attributes"
        fi
        
        if grep -q 'alt=' "$html_file"; then
            print_result "Image Alt Text" "PASS" "$html_file has image alt attributes"
        else
            print_result "Image Alt Text" "WARN" "$html_file may be missing image alt text"
        fi
        
        if grep -q 'skip.*content' "$html_file"; then
            print_result "Skip Links" "PASS" "$html_file has skip to content link"
        else
            print_result "Skip Links" "WARN" "$html_file missing skip to content link"
        fi
    fi
done

# Test 7: Check Service Worker cache strategy
echo ""
echo "💾 Testing Service Worker..."
if [ -f "sw.js" ]; then
    if grep -q 'cache' "sw.js"; then
        print_result "SW Caching" "PASS" "Service Worker implements caching"
    else
        print_result "SW Caching" "WARN" "Service Worker may not implement caching"
    fi
    
    if grep -q 'offline' "sw.js"; then
        print_result "SW Offline" "PASS" "Service Worker has offline support"
    else
        print_result "SW Offline" "WARN" "Service Worker may not support offline functionality"
    fi
fi

# Test 8: Check icon files
echo ""
echo "🎨 Testing Icon Files..."
icon_files=("assets/img/favicon.png" "assets/img/apple-touch-icon.png")
critical_icons=("assets/img/icon-192x192.png" "assets/img/icon-512x512.png")

for file in "${icon_files[@]}"; do
    if [ -f "$file" ]; then
        print_result "Icon File" "PASS" "$file exists"
    else
        print_result "Icon File" "WARN" "$file is missing"
    fi
done

for file in "${critical_icons[@]}"; do
    if [ -f "$file" ]; then
        print_result "PWA Icon" "PASS" "$file exists"
    else
        print_result "PWA Icon" "FAIL" "$file is missing (critical for PWA)"
    fi
done

# Test 9: Validate HTML structure
echo ""
echo "🔍 Testing HTML Structure..."
for html_file in index.html experience.html contact.html; do
    if [ -f "$html_file" ]; then
        # Check for semantic HTML
        if grep -q '<main' "$html_file"; then
            print_result "Semantic HTML" "PASS" "$html_file uses semantic <main> element"
        else
            print_result "Semantic HTML" "WARN" "$html_file missing semantic <main> element"
        fi
        
        if grep -q '<header' "$html_file"; then
            print_result "Semantic HTML" "PASS" "$html_file uses semantic <header> element"
        else
            print_result "Semantic HTML" "WARN" "$html_file missing semantic <header> element"
        fi
        
        if grep -q '<nav' "$html_file"; then
            print_result "Semantic HTML" "PASS" "$html_file uses semantic <nav> element"
        else
            print_result "Semantic HTML" "WARN" "$html_file missing semantic <nav> element"
        fi
    fi
done

# Test 10: Check script loading order
echo ""
echo "⚡ Testing Script Loading..."
for html_file in index.html experience.html contact.html; do
    if [ -f "$html_file" ]; then
        # Check if theme.js loads before other scripts
        theme_line=$(grep -n "theme.js" "$html_file" | cut -d: -f1)
        other_line=$(grep -n "language.js" "$html_file" | cut -d: -f1)
        
        if [ ! -z "$theme_line" ] && [ ! -z "$other_line" ] && [ "$theme_line" -lt "$other_line" ]; then
            print_result "Script Order" "PASS" "$html_file loads theme.js before other scripts"
        elif [ ! -z "$theme_line" ]; then
            print_result "Script Order" "WARN" "$html_file script loading order may need optimization"
        fi
    fi
done

# Summary
echo ""
echo "📊 Testing Summary"
echo "=================="
echo -e "${GREEN}Tests Passed: $TESTS_PASSED${NC}"
echo -e "${YELLOW}Warnings: $TESTS_WARNING${NC}"
echo -e "${RED}Tests Failed: $TESTS_FAILED${NC}"
echo ""

# Overall status
if [ $TESTS_FAILED -eq 0 ]; then
    if [ $TESTS_WARNING -eq 0 ]; then
        echo -e "${GREEN}🎉 All tests passed! Portfolio is fully optimized.${NC}"
        exit 0
    else
        echo -e "${YELLOW}⚠️  Some warnings found. Portfolio is mostly optimized.${NC}"
        exit 0
    fi
else
    echo -e "${RED}❌ Some tests failed. Portfolio needs attention.${NC}"
    exit 1
fi
