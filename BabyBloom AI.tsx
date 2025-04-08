// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
const App: React.FC = () => {
const [activeTab, setActiveTab] = useState('baby');
const [currentDate, setCurrentDate] = useState('');
const [babyAge, setBabyAge] = useState('3 months 2 weeks');
const [feedingTime, setFeedingTime] = useState(0);
const [isFeeding, setIsFeeding] = useState(false);
const [feedingSide, setFeedingSide] = useState('left');
const [sleepTime, setSleepTime] = useState(0);
const [isSleeping, setIsSleeping] = useState(false);
const [lastDiaper, setLastDiaper] = useState('2 hours ago');
const [moodRating, setMoodRating] = useState(3);
const [journalText, setJournalText] = useState('');
// Cry translator states
const [isListening, setIsListening] = useState(false);
const [cryAnalysisResult, setCryAnalysisResult] = useState('');
const [cryConfidence, setCryConfidence] = useState(0);
const [showCryModal, setShowCryModal] = useState(false);
const [cryHistory, setCryHistory] = useState<{time: string, reason: string, confidence: number}[]>([
{time: '2 hours ago', reason: 'Hungry', confidence: 92},
{time: 'Yesterday, 10:45 PM', reason: 'Tired', confidence: 87},
{time: 'Yesterday, 3:20 PM', reason: 'Discomfort', confidence: 78},
]);
useEffect(() => {
const date = new Date();
const options: Intl.DateTimeFormatOptions = {
weekday: 'long',
year: 'numeric',
month: 'long',
day: 'numeric'
};
setCurrentDate(date.toLocaleDateString('en-US', options));
// Timer for tracking
let interval: NodeJS.Timeout;
if (isFeeding) {
interval = setInterval(() => {
setFeedingTime(prev => prev + 1);
}, 1000);
} else if (isSleeping) {
interval = setInterval(() => {
setSleepTime(prev => prev + 1);
}, 1000);
}
return () => clearInterval(interval);
}, [isFeeding, isSleeping]);
const formatTime = (seconds: number) => {
const mins = Math.floor(seconds / 60);
const secs = seconds % 60;
return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
const toggleFeeding = () => {
if (!isFeeding) {
setFeedingTime(0);
}
setIsFeeding(!isFeeding);
};
const toggleSleeping = () => {
if (!isSleeping) {
setSleepTime(0);
}
setIsSleeping(!isSleeping);
};
const [showDiaperModal, setShowDiaperModal] = useState(false);
const [diaperType, setDiaperType] = useState('wet');
const [diaperTime, setDiaperTime] = useState('');
const [diaperConsistency, setDiaperConsistency] = useState('normal');
const [diaperColor, setDiaperColor] = useState('yellow');
const [diaperNotes, setDiaperNotes] = useState('');
const [diaperImage, setDiaperImage] = useState('');
const [isAnalyzing, setIsAnalyzing] = useState(false);
const [analysisResult, setAnalysisResult] = useState('');
const [showGrowthModal, setShowGrowthModal] = useState(false);
const [growthData, setGrowthData] = useState({
weight: 6.2,
height: 62,
head: 40,
date: new Date().toISOString().split('T')[0]
});
const [growthHistory, setGrowthHistory] = useState([
{ date: '2025-03-04', weight: 5.8, height: 60, head: 39.5 },
{ date: '2025-02-04', weight: 5.3, height: 58, head: 39 },
{ date: '2025-01-04', weight: 4.8, height: 56, head: 38.5 },
{ date: '2024-12-04', weight: 4.3, height: 54, head: 38 },
]);
const growthChartRef = useRef<HTMLDivElement>(null);
useEffect(() => {
if (growthChartRef.current) {
const chartInstance = echarts.init(growthChartRef.current);
// Prepare data for chart
const dates = [...growthHistory.map(item => item.date), '2025-04-04'];
const weights = [...growthHistory.map(item => item.weight), growthData.weight];
const heights = [...growthHistory.map(item => item.height), growthData.height];
const heads = [...growthHistory.map(item => item.head), growthData.head];
// Custom symbols for each metric
const weightSymbol = 'path://M18.5,4h-4V3c0-1.7-1.3-3-3-3h-3C6.8,0,5.5,1.3,5.5,3v1h-4C0.7,4,0,4.7,0,5.5v16C0,22.3,0.7,23,1.5,23h17c0.8,0,1.5-0.7,1.5-1.5v-16C20,4.7,19.3,4,18.5,4z M7.5,3c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v1h-5V3z M18,21H2V6h16V21z M10,9.5C8.6,9.5,7.5,10.6,7.5,12S8.6,14.5,10,14.5s2.5-1.1,2.5-2.5S11.4,9.5,10,9.5z M10,12.5c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5S10.3,12.5,10,12.5z M14.5,16h-9c-0.3,0-0.5,0.2-0.5,0.5S5.2,17,5.5,17h9c0.3,0,0.5-0.2,0.5-0.5S14.8,16,14.5,16z';
const heightSymbol = 'path://M12,0C5.4,0,0,5.4,0,12s5.4,12,12,12s12-5.4,12-12S18.6,0,12,0z M12,22C6.5,22,2,17.5,2,12S6.5,2,12,2s10,4.5,10,10S17.5,22,12,22z M16.7,13.7c-0.4,0.4-1,0.4-1.4,0L13,11.4V17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-5.6L8.7,13.7c-0.4,0.4-1,0.4-1.4,0s-0.4-1,0-1.4l4-4c0.4-0.4,1-0.4,1.4,0l4,4C17.1,12.7,17.1,13.3,16.7,13.7z';
const headSymbol = 'path://M12,0C5.4,0,0,5.4,0,12s5.4,12,12,12s12-5.4,12-12S18.6,0,12,0z M12,22C6.5,22,2,17.5,2,12S6.5,2,12,2s10,4.5,10,10S17.5,22,12,22z M12,6c-3.3,0-6,2.7-6,6s2.7,6,6,6s6-2.7,6-6S15.3,6,12,6z M12,16c-2.2,0-4-1.8-4-4s1.8-4,4-4s4,1.8,4,4S14.2,16,12,16z';
const option = {
tooltip: {
trigger: 'axis',
formatter: function(params: any) {
let result = params[0].axisValue + '<br/>';
params.forEach((param: any) => {
let icon = '';
if (param.seriesName === 'Weight') {
icon = '<i class="fas fa-baby-bottle" style="color:#3B82F6;margin-right:5px;"></i>';
} else if (param.seriesName === 'Height') {
icon = '<i class="fas fa-ruler-vertical" style="color:#10B981;margin-right:5px;"></i>';
} else if (param.seriesName === 'Head') {
icon = '<i class="fas fa-head-side" style="color:#8B5CF6;margin-right:5px;"></i>';
}
let value = param.value;
let unit = '';
if (param.seriesName === 'Weight') unit = ' kg';
if (param.seriesName === 'Height') unit = ' cm';
if (param.seriesName === 'Head') unit = ' cm';
result += icon + param.seriesName + ': ' + value + unit + '<br/>';
});
return result;
}
},
legend: {
data: ['Weight', 'Height', 'Head'],
bottom: 0,
icon: 'circle',
itemWidth: 10,
itemHeight: 10,
textStyle: {
color: '#666'
}
},
grid: {
left: '3%',
right: '4%',
bottom: '10%',
top: '15%',
containLabel: true
},
xAxis: {
type: 'category',
data: dates,
axisLabel: {
formatter: function(value: string) {
return value.substring(5); // Show only month-day
}
},
splitLine: {
show: false
},
axisLine: {
lineStyle: {
color: '#ddd'
}
}
},
yAxis: [
{
type: 'value',
name: 'kg/cm',
position: 'left',
axisLine: {
show: true,
lineStyle: {
color: '#ddd'
}
},
splitLine: {
lineStyle: {
type: 'dashed',
color: '#eee'
}
}
}
],
series: [
{
name: 'Weight',
type: 'line',
data: weights,
symbol: weightSymbol,
symbolSize: 15,
itemStyle: {
color: '#3B82F6'
},
lineStyle: {
width: 3,
shadowColor: 'rgba(59, 130, 246, 0.3)',
shadowBlur: 10
},
areaStyle: {
color: {
type: 'linear',
x: 0,
y: 0,
x2: 0,
y2: 1,
colorStops: [{
offset: 0, color: 'rgba(59, 130, 246, 0.2)'
}, {
offset: 1, color: 'rgba(59, 130, 246, 0.05)'
}]
}
},
emphasis: {
itemStyle: {
borderWidth: 3,
borderColor: '#fff',
shadowColor: 'rgba(59, 130, 246, 0.5)',
shadowBlur: 10
}
}
},
{
name: 'Height',
type: 'line',
data: heights,
symbol: heightSymbol,
symbolSize: 15,
itemStyle: {
color: '#10B981'
},
lineStyle: {
width: 3,
shadowColor: 'rgba(16, 185, 129, 0.3)',
shadowBlur: 10
},
areaStyle: {
color: {
type: 'linear',
x: 0,
y: 0,
x2: 0,
y2: 1,
colorStops: [{
offset: 0, color: 'rgba(16, 185, 129, 0.2)'
}, {
offset: 1, color: 'rgba(16, 185, 129, 0.05)'
}]
}
},
emphasis: {
itemStyle: {
borderWidth: 3,
borderColor: '#fff',
shadowColor: 'rgba(16, 185, 129, 0.5)',
shadowBlur: 10
}
}
},
{
name: 'Head',
type: 'line',
data: heads,
symbol: headSymbol,
symbolSize: 15,
itemStyle: {
color: '#8B5CF6'
},
lineStyle: {
width: 3,
shadowColor: 'rgba(139, 92, 246, 0.3)',
shadowBlur: 10
},
areaStyle: {
color: {
type: 'linear',
x: 0,
y: 0,
x2: 0,
y2: 1,
colorStops: [{
offset: 0, color: 'rgba(139, 92, 246, 0.2)'
}, {
offset: 1, color: 'rgba(139, 92, 246, 0.05)'
}]
}
},
emphasis: {
itemStyle: {
borderWidth: 3,
borderColor: '#fff',
shadowColor: 'rgba(139, 92, 246, 0.5)',
shadowBlur: 10
}
}
}
],
animation: true,
animationDuration: 1000,
animationEasing: 'elasticOut'
};
chartInstance.setOption(option);
// Add resize listener
const handleResize = () => {
chartInstance.resize();
};
window.addEventListener('resize', handleResize);
// Cleanup
return () => {
window.removeEventListener('resize', handleResize);
chartInstance.dispose();
};
}
}, [growthHistory, growthData]);
useEffect(() => {
// Set current time as default diaper time
const now = new Date();
const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');
setDiaperTime(`${hours}:${minutes}`);
}, []);
const handleTakePhoto = () => {
// In a real app, this would access the device camera
// For demo purposes, we'll simulate with a placeholder image
const mockPhotoUrl = "https://public.readdy.ai/ai/img_res/496d8c0ce7e848e4625a30ed7f25ff88.jpg";
setDiaperImage(mockPhotoUrl);
setAnalysisResult(''); // Clear previous analysis
};
const analyzeDiaperImage = () => {
setIsAnalyzing(true);
// Simulate AI analysis with a timeout
setTimeout(() => {
setIsAnalyzing(false);
setAnalysisResult(
"The stool appears to be normal in color and consistency. The yellowish-brown color indicates a healthy breastfed baby. No signs of blood or mucus detected. The consistency is appropriate for a 3-month-old. Continue monitoring for any changes in pattern or appearance."
);
}, 2000);
};
const handleDiaperChange = () => {
setLastDiaper('Just now');
setShowDiaperModal(false);
// Reset form for next use
setDiaperType('wet');
setDiaperConsistency('normal');
setDiaperColor('yellow');
setDiaperNotes('');
setDiaperImage('');
setAnalysisResult('');
};
// Cry translator functions
const startCryListening = () => {
setIsListening(true);
setCryAnalysisResult('');
setCryConfidence(0);
// Simulate listening and analysis with a timeout
setTimeout(() => {
analyzeCry();
}, 3000);
};
const stopCryListening = () => {
setIsListening(false);
};
const analyzeCry = () => {
// Simulate AI analysis
const reasons = ['Hungry', 'Tired', 'Discomfort', 'Needs burping', 'Wants attention', 'Overstimulated'];
const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
const randomConfidence = Math.floor(Math.random() * 20) + 80; // 80-99%
setCryAnalysisResult(randomReason);
setCryConfidence(randomConfidence);
setIsListening(false);
// Add to history
const now = new Date();
const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');
const timeString = `Today, ${hours}:${minutes}`;
setCryHistory(prev => [{
time: timeString,
reason: randomReason,
confidence: randomConfidence
}, ...prev.slice(0, 4)]); // Keep only the 5 most recent entries
};
const renderBabyDashboard = () => (
<div className="px-4 pt-16 pb-20">
<div className="flex items-center mb-6">
<div className="w-16 h-16 rounded-full overflow-hidden mr-4">
<img
src="https://public.readdy.ai/ai/img_res/8cc7ba9658a49c6a95e51a872932055f.jpg"
alt="Baby"
className="w-full h-full object-cover object-top"
/>
</div>
<div>
<h2 className="text-xl font-semibold">Emma</h2>
<p className="text-gray-600">{babyAge}</p>
</div>
</div>
<div className="grid grid-cols-3 gap-3 mb-6">
<button
className={`p-4 rounded-full shadow-md text-center cursor-pointer !rounded-button ${isFeeding ? 'bg-pink-100 border-2 border-pink-300' : 'bg-white'}`}
onClick={toggleFeeding}
>
<i className="fas fa-heart text-xl text-pink-500 mb-2"></i>
<p className="font-medium">Feeding</p>
{isFeeding && <p className="text-pink-500 mt-1">{formatTime(feedingTime)}</p>}
</button>
<button
className={`p-4 rounded-full shadow-md text-center cursor-pointer !rounded-button ${isSleeping ? 'bg-indigo-100 border-2 border-indigo-300' : 'bg-white'}`}
onClick={toggleSleeping}
>
<i className="fas fa-moon text-xl text-indigo-500 mb-2"></i>
<p className="font-medium">Sleep</p>
{isSleeping && <p className="text-indigo-500 mt-1">{formatTime(sleepTime)}</p>}
</button>
<button
className="p-4 rounded-full shadow-md text-center cursor-pointer !rounded-button bg-white"
onClick={() => {
document.getElementById('diaperModal')?.classList.remove('hidden');
}}
>
<i className="fas fa-baby text-xl text-green-500 mb-2"></i>
<p className="font-medium">Diaper</p>
<p className="text-xs text-gray-500 mt-1">Last: {lastDiaper}</p>
</button>
</div>
<div className="grid grid-cols-3 gap-3 mb-6">
<a href="https://readdy.ai/home/dce94bc1-350b-44d5-8005-1086f0071f57/74266665-e580-4f6c-8591-1d499202fc2c" data-readdy="true" className="block w-full">
<button
className="p-4 rounded-full shadow-md text-center cursor-pointer !rounded-button bg-white w-full"
>
<i className="fas fa-heartbeat text-xl text-teal-500 mb-2"></i>
<p className="font-medium">Health Tracker</p>
<p className="text-xs text-gray-500 mt-1">Track vitals</p>
</button>
</a>
<button
className="p-4 rounded-full shadow-md text-center cursor-pointer !rounded-button bg-white relative"
onClick={() => setShowCryModal(true)}
>
<i className="fas fa-volume-up text-xl text-purple-500 mb-2"></i>
<p className="font-medium">Cry Translator</p>
<p className="text-xs text-gray-500 mt-1">AI-powered</p>
<div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
<span>New</span>
</div>
</button>
<a href="https://readdy.ai/home/dce94bc1-350b-44d5-8005-1086f0071f57/b8e7b1d5-af21-4ce1-9ecb-2ed5ecdde63c" data-readdy="true" className="block w-full">
<button
className="p-4 rounded-full shadow-md text-center cursor-pointer !rounded-button bg-white w-full"
>
<i className="fas fa-shopping-bag text-xl text-pink-400 mb-2"></i>
<p className="font-medium">Shopping</p>
<p className="text-xs text-gray-500 mt-1">Baby essentials</p>
<p className="text-xs text-gray-500 mt-1">AI-powered</p>
</button>
</a>
</div>
{isFeeding && (
<div className="bg-white p-4 rounded-lg shadow-md mb-6">
<h3 className="font-medium mb-3">Feeding Details</h3>
<div className="flex justify-between mb-3">
<button
className={`px-4 py-2 rounded-full cursor-pointer !rounded-button ${feedingSide === 'left' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
onClick={() => setFeedingSide('left')}
>
Left Breast
</button>
<button
className={`px-4 py-2 rounded-full cursor-pointer !rounded-button ${feedingSide === 'right' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
onClick={() => setFeedingSide('right')}
>
Right Breast
</button>
</div>
<div className="text-center">
<p className="text-xl font-semibold text-pink-500">{formatTime(feedingTime)}</p>
<button
className="mt-3 px-4 py-2 bg-pink-500 text-white rounded-full cursor-pointer !rounded-button"
onClick={toggleFeeding}
>
Stop Feeding
</button>
</div>
</div>
)}
{isSleeping && (
<div className="bg-white p-4 rounded-lg shadow-md mb-6">
<h3 className="font-medium mb-3">Sleep Tracking</h3>
<div className="text-center">
<p className="text-xl font-semibold text-indigo-500">{formatTime(sleepTime)}</p>
<button
className="mt-3 px-4 py-2 bg-indigo-500 text-white rounded-full cursor-pointer !rounded-button"
onClick={toggleSleeping}
>
Stop Sleep Tracking
</button>
</div>
</div>
)}
<div className="bg-white p-4 rounded-lg shadow-md mb-6">
<div className="flex justify-between items-center mb-3">
<h3 className="font-medium">Growth Tracker</h3>
<button
className="text-blue-500 text-sm cursor-pointer !rounded-button"
onClick={() => document.getElementById('growthModal')?.classList.remove('hidden')}
>
Update
</button>
</div>
<div className="grid grid-cols-3 gap-2 text-center">
<div className="p-2 bg-blue-50 rounded-full">
<div className="flex justify-center mb-1">
<i className="fas fa-baby-bottle text-blue-500 text-lg"></i>
</div>
<p className="text-xs text-gray-500">Weight</p>
<p className="font-semibold">6.2 kg</p>
<p className="text-xs text-green-500">+0.4 kg</p>
</div>
<div className="p-2 bg-blue-50 rounded-full">
<div className="flex justify-center mb-1">
<i className="fas fa-ruler-vertical text-green-500 text-lg"></i>
</div>
<p className="text-xs text-gray-500">Height</p>
<p className="font-semibold">62 cm</p>
<p className="text-xs text-green-500">+2 cm</p>
</div>
<div className="p-2 bg-blue-50 rounded-full">
<div className="flex justify-center mb-1">
<i className="fas fa-head-side text-purple-500 text-lg"></i>
</div>
<p className="text-xs text-gray-500">Head</p>
<p className="font-semibold">40 cm</p>
<p className="text-xs text-green-500">+0.5 cm</p>
</div>
</div>
<div className="mt-4">
<div className="flex justify-between items-center mb-2">
<h4 className="text-sm font-medium">Growth Charts</h4>
<button className="text-xs text-blue-500 cursor-pointer !rounded-button">View Full</button>
</div>
<div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
<div ref={growthChartRef} style={{ height: '200px', width: '100%' }}></div>
</div>
<div className="grid grid-cols-3 gap-2 mt-2">
<div className="flex items-center">
<div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
<span className="text-xs text-gray-600">Weight</span>
</div>
<div className="flex items-center">
<div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
<span className="text-xs text-gray-600">Height</span>
</div>
<div className="flex items-center">
<div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
<span className="text-xs text-gray-600">Head</span>
</div>
</div>
</div>
</div>
<div className="bg-white p-4 rounded-lg shadow-md mb-6">
<div className="flex justify-between items-center mb-3">
<h3 className="font-medium">Upcoming Vaccinations</h3>
<button className="text-blue-500 text-sm cursor-pointer !rounded-button">View All</button>
</div>
<div className="bg-yellow-50 p-3 rounded-full border-l-4 border-yellow-400">
<div className="flex justify-between items-center">
<div>
<p className="font-medium">4-Month Vaccines</p>
<p className="text-sm text-gray-600">DTaP, IPV, Hib, PCV, Rotavirus</p>
</div>
<p className="text-sm bg-yellow-200 px-2 py-1 rounded-full">In 3 weeks</p>
</div>
</div>
</div>
<div className="bg-white p-4 rounded-lg shadow-md">
<div className="flex justify-between items-center mb-3">
<h3 className="font-medium">Recent Activities</h3>
<button className="text-blue-500 text-sm cursor-pointer !rounded-button">View All</button>
</div>
<div className="space-y-3">
<div className="flex items-start bg-white p-2 rounded-full shadow-sm">
<div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mr-3">
<i className="fas fa-baby-bottle text-pink-500"></i>
</div>
<div>
<p className="font-medium">Feeding</p>
<p className="text-sm text-gray-600">Left breast, 15 minutes</p>
<p className="text-xs text-gray-400">2 hours ago</p>
</div>
</div>
<div className="flex items-start bg-white p-2 rounded-full shadow-sm">
<div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
<i className="fas fa-baby text-green-500"></i>
</div>
<div>
<p className="font-medium">Diaper Change</p>
<p className="text-sm text-gray-600">Wet diaper</p>
<p className="text-xs text-gray-400">3 hours ago</p>
</div>
</div>
<div className="flex items-start bg-white p-2 rounded-full shadow-sm">
<div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
<i className="fas fa-moon text-indigo-500"></i>
</div>
<div>
<p className="font-medium">Sleep</p>
<p className="text-sm text-gray-600">2 hours 15 minutes</p>
<p className="text-xs text-gray-400">5 hours ago</p>
</div>
</div>
</div>
</div>
</div>
);
const renderMomDashboard = () => (
<div className="px-4 pt-16 pb-20">
<div className="flex items-center mb-6">
<div className="w-16 h-16 rounded-full overflow-hidden mr-4">
<img
src="https://public.readdy.ai/ai/img_res/99456327d940b8cf1e10cd22b6180eaa.jpg"
alt="Mom"
className="w-full h-full object-cover object-top"
/>
</div>
<div>
<h2 className="text-xl font-semibold">Olivia</h2>
<p className="text-gray-600">3 months postpartum</p>
</div>
</div>
<div className="bg-white p-4 rounded-lg shadow-md mb-6">
<h3 className="font-medium mb-3">How are you feeling today?</h3>
<div className="flex justify-between items-center mb-4">
<i className="fas fa-sad-tear text-2xl text-gray-400"></i>
<div className="w-full mx-3">
<input
type="range"
min="1"
max="5"
value={moodRating}
onChange={(e) => setMoodRating(parseInt(e.target.value))}
className="w-full"
/>
</div>
<i className="fas fa-smile-beam text-2xl text-yellow-400"></i>
</div>
<div className="text-center text-sm text-gray-600">
{moodRating === 1 && "Having a tough day"}
{moodRating === 2 && "Not feeling great"}
{moodRating === 3 && "Doing okay"}
{moodRating === 4 && "Feeling good"}
{moodRating === 5 && "Feeling great!"}
</div>
</div>
<div className="bg-white p-4 rounded-lg shadow-md mb-6">
<h3 className="font-medium mb-3">Journal Your Thoughts</h3>
<textarea
className="w-full border border-gray-300 rounded-lg p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-300"
placeholder="How are you feeling? What's on your mind today?"
value={journalText}
onChange={(e) => setJournalText(e.target.value)}
></textarea>
<div className="flex justify-between mt-3">
<button className="flex items-center text-gray-600 cursor-pointer !rounded-button">
<i className="fas fa-microphone mr-1"></i>
<span>Voice</span>
</button>
<button className="px-4 py-2 bg-blue-500 text-white rounded-full cursor-pointer !rounded-button">
Save
</button>
</div>
</div>
<div className="bg-white p-4 rounded-lg shadow-md mb-6">
<h3 className="font-medium mb-3">Talk to AI Wellness Coach</h3>
<div className="bg-gray-50 p-3 rounded-lg mb-3">
<p className="text-sm">How can I help you today? I'm here to discuss postpartum recovery, emotional wellbeing, or any concerns you might have.</p>
</div>
<div className="flex">
<input
type="text"
className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none"
placeholder="Ask me anything..."
/>
<button className="bg-blue-500 text-white px-4 rounded-r-lg cursor-pointer !rounded-button">
<i className="fas fa-paper-plane"></i>
</button>
</div>
<div className="mt-3 grid grid-cols-2 gap-2">
<button className="text-xs bg-blue-50 p-2 rounded-full text-blue-600 cursor-pointer !rounded-button">
Trouble sleeping?
</button>
<button className="text-xs bg-blue-50 p-2 rounded-full text-blue-600 cursor-pointer !rounded-button">
Feeling overwhelmed
</button>
<button className="text-xs bg-blue-50 p-2 rounded-full text-blue-600 cursor-pointer !rounded-button">
Breastfeeding tips
</button>
<button className="text-xs bg-blue-50 p-2 rounded-full text-blue-600 cursor-pointer !rounded-button">
Self-care ideas
</button>
</div>
</div>
<div className="bg-white p-4 rounded-lg shadow-md mb-6">
<div className="flex justify-between items-center mb-3">
<h3 className="font-medium">Rest & Sleep</h3>
<button className="text-blue-500 text-sm cursor-pointer !rounded-button">Track</button>
</div>
<div className="bg-indigo-50 p-3 rounded-lg">
<p className="text-sm mb-2">Last 7 days average:</p>
<div className="flex items-center">
<div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
<i className="fas fa-bed text-indigo-500"></i>
</div>
<div>
<p className="font-semibold">5.2 hours</p>
<p className="text-xs text-gray-500">Interrupted sleep</p>
</div>
</div>
<div className="mt-3 h-10 bg-gray-200 rounded-full overflow-hidden">
<div className="h-full bg-indigo-400 rounded-full" style={{ width: '65%' }}></div>
</div>
<p className="text-xs text-gray-500 mt-1">65% of recommended 8 hours</p>
</div>
</div>
<div className="bg-white p-4 rounded-lg shadow-md">
<div className="flex justify-between items-center mb-3">
<h3 className="font-medium">Postpartum Recovery</h3>
<button className="text-blue-500 text-sm cursor-pointer !rounded-button">Update</button>
</div>
<div className="space-y-3">
<div className="flex items-center justify-between">
<div className="flex items-center">
<div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mr-3">
<i className="fas fa-heartbeat text-pink-500"></i>
</div>
<p>Physical Recovery</p>
</div>
<div className="flex">
<i className="fas fa-circle text-green-500 mx-0.5"></i>
<i className="fas fa-circle text-green-500 mx-0.5"></i>
<i className="fas fa-circle text-green-500 mx-0.5"></i>
<i className="fas fa-circle text-gray-300 mx-0.5"></i>
<i className="fas fa-circle text-gray-300 mx-0.5"></i>
</div>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center">
<div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
<i className="fas fa-brain text-purple-500"></i>
</div>
<p>Emotional Wellbeing</p>
</div>
<div className="flex">
<i className="fas fa-circle text-green-500 mx-0.5"></i>
<i className="fas fa-circle text-green-500 mx-0.5"></i>
<i className="fas fa-circle text-gray-300 mx-0.5"></i>
<i className="fas fa-circle text-gray-300 mx-0.5"></i>
<i className="fas fa-circle text-gray-300 mx-0.5"></i>
</div>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center">
<div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
<i className="fas fa-baby-bottle text-yellow-500"></i>
</div>
<p>Breastfeeding</p>
</div>
<div className="flex">
<i className="fas fa-circle text-green-500 mx-0.5"></i>
<i className="fas fa-circle text-green-500 mx-0.5"></i>
<i className="fas fa-circle text-green-500 mx-0.5"></i>
<i className="fas fa-circle text-green-500 mx-0.5"></i>
<i className="fas fa-circle text-gray-300 mx-0.5"></i>
</div>
</div>
</div>
</div>
</div>
);
const renderCommunityDashboard = () => (
<div className="px-4 pt-16 pb-20">
<h2 className="text-xl font-semibold mb-4">Community</h2>
<div className="bg-white p-4 rounded-lg shadow-md mb-6">
<h3 className="font-medium mb-3">Your Groups</h3>
<div className="space-y-3">
<div className="flex items-center p-3 bg-blue-50 rounded-full">
<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
<i className="fas fa-users text-blue-500"></i>
</div>
<div className="flex-1">
<p className="font-medium">April 2025 Babies</p>
<p className="text-xs text-gray-500">243 members • 15 new posts</p>
</div>
<div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">
<span className="text-xs">12</span>
</div>
</div>
<div className="flex items-center p-3 bg-purple-50 rounded-full">
<div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
<i className="fas fa-map-marker-alt text-purple-500"></i>
</div>
<div className="flex-1">
<p className="font-medium">New York Moms</p>
<p className="text-xs text-gray-500">1,243 members • 32 new posts</p>
</div>
<div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">
<span className="text-xs">5</span>
</div>
</div>
<div className="flex items-center p-3 bg-green-50 rounded-full">
<div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
<i className="fas fa-baby text-green-500"></i>
</div>
<div className="flex-1">
<p className="font-medium">First-Time Parents</p>
<p className="text-xs text-gray-500">5,678 members • 47 new posts</p>
</div>
<div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">
<span className="text-xs">8</span>
</div>
</div>
</div>
<a href="https://readdy.ai/home/dce94bc1-350b-44d5-8005-1086f0071f57/952ae4ab-3755-45d8-b270-49f3deb7c76e" data-readdy="true" className="block w-full">
<button className="w-full mt-3 py-2 border border-blue-500 text-blue-500 rounded-lg cursor-pointer !rounded-button">
Find More Groups
</button>
</a>
</div>
<div className="bg-white p-4 rounded-lg shadow-md mb-6">
<h3 className="font-medium mb-3">Expert Q&A</h3>
<div className="space-y-3">
<div className="p-3 border border-gray-200 rounded-full">
<div className="flex items-center mb-2">
<div className="w-8 h-8 rounded-full overflow-hidden mr-2">
<img
src="https://public.readdy.ai/ai/img_res/f9bd941a98b948f6da3545f60e98c813.jpg"
alt="Dr. Sarah"
className="w-full h-full object-cover object-top"
/>
</div>
<div>
<p className="font-medium text-sm">Dr. Sarah Johnson</p>
<p className="text-xs text-gray-500">Pediatrician</p>
</div>
</div>
<p className="text-sm mb-2">When should I introduce solid foods to my baby?</p>
<p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-full">Most babies are ready to start solids around 6 months. Look for signs like good head control, sitting with support, and showing interest in your food.</p>
<div className="flex justify-between mt-2 text-xs">
<span className="text-gray-500">2 days ago</span>
<span className="text-blue-500 cursor-pointer">Read more</span>
</div>
</div>
<div className="p-3 border border-gray-200 rounded-full">
<div className="flex items-center mb-2">
<div className="w-8 h-8 rounded-full overflow-hidden mr-2">
<img
src="https://public.readdy.ai/ai/img_res/eb4e5cc5a57f0cfa18ad03db867eb402.jpg"
alt="Dr. Michael"
className="w-full h-full object-cover object-top"
/>
</div>
<div>
<p className="font-medium text-sm">Dr. Michael Chen</p>
<p className="text-xs text-gray-500">Lactation Consultant</p>
</div>
</div>
<p className="text-sm mb-2">How do I know if my baby is getting enough milk?</p>
<p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-full">Look for 6-8 wet diapers per day, regular weight gain, and your baby seems satisfied after feedings.</p>
<div className="flex justify-between mt-2 text-xs">
<span className="text-gray-500">1 week ago</span>
<span className="text-blue-500 cursor-pointer">Read more</span>
</div>
</div>
</div>
<button className="w-full mt-3 py-2 bg-blue-500 text-white rounded-lg cursor-pointer !rounded-button">
Ask a Question
</button>
</div>
<div className="bg-white p-4 rounded-lg shadow-md">
<h3 className="font-medium mb-3">Invite Friends</h3>
<div className="bg-yellow-50 p-3 rounded-full mb-4">
<div className="flex items-center">
<div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
<i className="fas fa-gift text-yellow-500"></i>
</div>
<div>
<p className="font-medium">Earn Free Consultation</p>
<p className="text-xs text-gray-600">Invite 3 friends and get a free 15-min pediatric consultation</p>
</div>
</div>
<div className="mt-3 bg-white p-2 rounded-full border border-gray-200 flex justify-between items-center">
<p className="text-sm font-medium">MOMMA25</p>
<button className="text-blue-500 text-sm cursor-pointer !rounded-button">Copy</button>
</div>
</div>
<div className="flex flex-col space-y-2">
<button className="py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center cursor-pointer !rounded-button">
<i className="fab fa-facebook-f mr-2"></i>
Share on Facebook
</button>
<button className="py-2 bg-pink-500 text-white rounded-lg flex items-center justify-center cursor-pointer !rounded-button">
<i className="fab fa-instagram mr-2"></i>
Share on Instagram
</button>
<button className="py-2 bg-green-500 text-white rounded-lg flex items-center justify-center cursor-pointer !rounded-button">
<i className="fab fa-whatsapp mr-2"></i>
Share on WhatsApp
</button>
</div>
</div>
</div>
);
const renderProfileDashboard = () => (
<div className="px-4 pt-16 pb-20">
<div className="flex flex-col items-center mb-6">
<div className="w-24 h-24 rounded-full overflow-hidden mb-3">
<img
src="https://public.readdy.ai/ai/img_res/aedd684de345a5ab399b9e637508b430.jpg"
alt="Profile"
className="w-full h-full object-cover object-top"
/>
</div>
<h2 className="text-xl font-semibold">Olivia Williams</h2>
<p className="text-gray-600">olivia.w@example.com</p>
</div>
<div className="bg-white p-4 rounded-lg shadow-md mb-6">
<h3 className="font-medium mb-3">Your Family</h3>
<div className="flex items-center p-3 bg-blue-50 rounded-full mb-3">
<div className="w-12 h-12 rounded-full overflow-hidden mr-3">
<img
src="https://public.readdy.ai/ai/img_res/74d030147d26d08eac334161ea4d02b3.jpg"
alt="Baby"
className="w-full h-full object-cover object-top"
/>
</div>
<div className="flex-1">
<p className="font-medium">Emma</p>
<p className="text-xs text-gray-500">3 months 2 weeks • Female</p>
</div>
<button className="text-blue-500 cursor-pointer !rounded-button">
<i className="fas fa-pen"></i>
</button>
</div>
<button className="w-full py-2 border border-dashed border-gray-300 text-gray-500 rounded-lg flex items-center justify-center cursor-pointer !rounded-button">
<i className="fas fa-plus mr-2"></i>
Add Child
</button>
</div>
<div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
<div className="p-4 border-b border-gray-200">
<h3 className="font-medium">Account Settings</h3>
</div>
<div className="divide-y divide-gray-200">
<div className="flex items-center justify-between p-4 cursor-pointer rounded-full hover:bg-gray-50">
<div className="flex items-center">
<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
<i className="fas fa-user text-blue-500"></i>
</div>
<p>Personal Information</p>
</div>
<i className="fas fa-chevron-right text-gray-400"></i>
</div>
<div className="flex items-center justify-between p-4 cursor-pointer rounded-full hover:bg-gray-50">
<div className="flex items-center">
<div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
<i className="fas fa-bell text-purple-500"></i>
</div>
<p>Notifications</p>
</div>
<i className="fas fa-chevron-right text-gray-400"></i>
</div>
<div className="flex items-center justify-between p-4 cursor-pointer rounded-full hover:bg-gray-50">
<div className="flex items-center">
<div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
<i className="fas fa-lock text-green-500"></i>
</div>
<p>Privacy & Security</p>
</div>
<i className="fas fa-chevron-right text-gray-400"></i>
</div>
<div className="flex items-center justify-between p-4 cursor-pointer rounded-full hover:bg-gray-50">
<div className="flex items-center">
<div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
<i className="fas fa-language text-yellow-500"></i>
</div>
<p>Language</p>
</div>
<div className="flex items-center">
<span className="text-gray-500 mr-2">English</span>
<i className="fas fa-chevron-right text-gray-400"></i>
</div>
</div>
</div>
</div>
<div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
<div className="p-4 border-b border-gray-200">
<h3 className="font-medium">Subscription</h3>
</div>
<div className="p-4">
<div className="flex items-center justify-between mb-3">
<div>
<p className="font-medium">Free Plan</p>
<p className="text-xs text-gray-500">Basic tracking and community features</p>
</div>
<span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Current</span>
</div>
<a href="https://readdy.ai/home/dce94bc1-350b-44d5-8005-1086f0071f57/421009d4-f18f-4f55-b473-eb296f04bdb9" data-readdy="true" className="block w-full">
<button className="w-full py-2 bg-blue-500 text-white rounded-lg cursor-pointer !rounded-button">
Upgrade to Premium
</button>
</a>
</div>
</div>
<div className="bg-white rounded-lg shadow-md overflow-hidden">
<div className="p-4 border-b border-gray-200">
<h3 className="font-medium">Support</h3>
</div>
<div className="divide-y divide-gray-200">
<div className="flex items-center justify-between p-4 cursor-pointer rounded-full hover:bg-gray-50">
<div className="flex items-center">
<div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
<i className="fas fa-question-circle text-teal-500"></i>
</div>
<p>Help Center</p>
</div>
<i className="fas fa-chevron-right text-gray-400"></i>
</div>
<div className="flex items-center justify-between p-4 cursor-pointer rounded-full hover:bg-gray-50">
<div className="flex items-center">
<div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
<i className="fas fa-comment-alt text-indigo-500"></i>
</div>
<p>Contact Us</p>
</div>
<i className="fas fa-chevron-right text-gray-400"></i>
</div>
<div className="flex items-center justify-between p-4 cursor-pointer rounded-full hover:bg-gray-50">
<div className="flex items-center">
<div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
<i className="fas fa-sign-out-alt text-red-500"></i>
</div>
<p className="text-red-500">Log Out</p>
</div>
</div>
</div>
</div>
</div>
);
return (
<div className="bg-gray-100 min-h-screen relative">
{/* Growth Tracker Modal */}
<div id="growthModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 hidden">
<div className="bg-white rounded-lg w-11/12 max-w-md">
<div className="p-4 border-b border-gray-200">
<div className="flex justify-between items-center">
<h3 className="font-medium text-lg">Update Growth Measurements</h3>
<button
onClick={() => document.getElementById('growthModal')?.classList.add('hidden')}
className="text-gray-500 hover:text-gray-700 !rounded-button"
>
<i className="fas fa-times"></i>
</button>
</div>
</div>
<div className="p-4">
<div className="mb-4">
<label className="block text-gray-700 text-sm font-medium mb-2">Date of Measurement</label>
<input
type="date"
value={growthData.date}
onChange={(e) => setGrowthData({...growthData, date: e.target.value})}
className="w-full p-2 border border-gray-300 rounded-lg"
/>
</div>
<div className="mb-4">
<label className="block text-gray-700 text-sm font-medium mb-2">Weight (kg)</label>
<div className="relative">
<input
type="number"
step="0.1"
min="0"
value={growthData.weight}
onChange={(e) => setGrowthData({...growthData, weight: parseFloat(e.target.value)})}
className="w-full p-2 border border-gray-300 rounded-lg"
/>
<div className="absolute right-3 top-2 text-gray-500 text-sm">kg</div>
</div>
<div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
<div
className="h-full bg-blue-400 rounded-full"
style={{ width: `${Math.min((growthData.weight / 10) * 100, 100)}%` }}
></div>
</div>
<div className="flex justify-between text-xs text-gray-500 mt-1">
<span>Previous: 5.8 kg</span>
<span>Change: +{(growthData.weight - 5.8).toFixed(1)} kg</span>
</div>
</div>
<div className="mb-4">
<label className="block text-gray-700 text-sm font-medium mb-2">Height (cm)</label>
<div className="relative">
<input
type="number"
step="0.5"
min="0"
value={growthData.height}
onChange={(e) => setGrowthData({...growthData, height: parseFloat(e.target.value)})}
className="w-full p-2 border border-gray-300 rounded-lg"
/>
<div className="absolute right-3 top-2 text-gray-500 text-sm">cm</div>
</div>
<div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
<div
className="h-full bg-green-400 rounded-full"
style={{ width: `${Math.min((growthData.height / 100) * 100, 100)}%` }}
></div>
</div>
<div className="flex justify-between text-xs text-gray-500 mt-1">
<span>Previous: 60 cm</span>
<span>Change: +{(growthData.height - 60).toFixed(1)} cm</span>
</div>
</div>
<div className="mb-4">
<label className="block text-gray-700 text-sm font-medium mb-2">Head Circumference (cm)</label>
<div className="relative">
<input
type="number"
step="0.1"
min="0"
value={growthData.head}
onChange={(e) => setGrowthData({...growthData, head: parseFloat(e.target.value)})}
className="w-full p-2 border border-gray-300 rounded-lg"
/>
<div className="absolute right-3 top-2 text-gray-500 text-sm">cm</div>
</div>
<div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
<div
className="h-full bg-purple-400 rounded-full"
style={{ width: `${Math.min((growthData.head / 50) * 100, 100)}%` }}
></div>
</div>
<div className="flex justify-between text-xs text-gray-500 mt-1">
<span>Previous: 39.5 cm</span>
<span>Change: +{(growthData.head - 39.5).toFixed(1)} cm</span>
</div>
</div>
<div className="bg-blue-50 p-3 rounded-lg mb-4">
<h4 className="text-sm font-medium text-blue-700 mb-2">Growth Percentiles</h4>
<div className="grid grid-cols-3 gap-2 text-center">
<div>
<div className="flex justify-center mb-1">
<i className="fas fa-baby-bottle text-blue-500"></i>
</div>
<p className="text-xs text-gray-600">Weight</p>
<p className="font-medium text-blue-600">65th</p>
<div className="h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
<div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
</div>
</div>
<div>
<div className="flex justify-center mb-1">
<i className="fas fa-ruler-vertical text-green-500"></i>
</div>
<p className="text-xs text-gray-600">Height</p>
<p className="font-medium text-green-600">72nd</p>
<div className="h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
<div className="h-full bg-green-500 rounded-full" style={{ width: '72%' }}></div>
</div>
</div>
<div>
<div className="flex justify-center mb-1">
<i className="fas fa-head-side text-purple-500"></i>
</div>
<p className="text-xs text-gray-600">Head</p>
<p className="font-medium text-purple-600">58th</p>
<div className="h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
<div className="h-full bg-purple-500 rounded-full" style={{ width: '58%' }}></div>
</div>
</div>
</div>
<div className="flex items-center justify-center mt-2">
<i className="fas fa-robot text-blue-400 mr-1"></i>
<span className="text-xs text-blue-600">AI analysis: Growth is on track with expected patterns</span>
</div>
</div>
<div className="flex space-x-2 mt-6">
<button
className="flex-1 py-2 bg-gray-300 rounded-lg !rounded-button"
onClick={() => document.getElementById('growthModal')?.classList.add('hidden')}
>
Cancel
</button>
<button
className="flex-1 py-2 bg-blue-500 text-white rounded-lg !rounded-button"
onClick={() => {
// Update the growth history
const newHistory = [{
date: growthData.date,
weight: growthData.weight,
height: growthData.height,
head: growthData.head
}, ...growthHistory];
setGrowthHistory(newHistory);
// Close the modal
document.getElementById('growthModal')?.classList.add('hidden');
}}
>
Save
</button>
</div>
</div>
</div>
</div>
{/* Diaper Change Modal */}
<div id="diaperModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 hidden">
<div className="bg-white rounded-lg w-11/12 max-w-md">
<div className="p-4 border-b border-gray-200">
<div className="flex justify-between items-center">
<h3 className="font-medium text-lg">Record Diaper Change</h3>
<button
onClick={() => document.getElementById('diaperModal')?.classList.add('hidden')}
className="text-gray-500 hover:text-gray-700 !rounded-button"
>
<i className="fas fa-times"></i>
</button>
</div>
</div>
<div className="p-4">
<div className="mb-4">
<label className="block text-gray-700 text-sm font-medium mb-2">Type</label>
<div className="flex space-x-2">
<button
className={`flex-1 py-2 rounded-lg !rounded-button ${diaperType === 'wet' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
onClick={() => setDiaperType('wet')}
>
Wet
</button>
<button
className={`flex-1 py-2 rounded-lg !rounded-button ${diaperType === 'dirty' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
onClick={() => setDiaperType('dirty')}
>
Dirty
</button>
<button
className={`flex-1 py-2 rounded-lg !rounded-button ${diaperType === 'both' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
onClick={() => setDiaperType('both')}
>
Both
</button>
</div>
</div>
<div className="mb-4">
<label className="block text-gray-700 text-sm font-medium mb-2">Time</label>
<input
type="time"
value={diaperTime}
onChange={(e) => setDiaperTime(e.target.value)}
className="w-full p-2 border border-gray-300 rounded-lg"
/>
</div>
{(diaperType === 'dirty' || diaperType === 'both') && (
<>
<div className="mb-4">
<label className="block text-gray-700 text-sm font-medium mb-2">Consistency</label>
<select
value={diaperConsistency}
onChange={(e) => setDiaperConsistency(e.target.value)}
className="w-full p-2 border border-gray-300 rounded-lg"
>
<option value="runny">Runny</option>
<option value="soft">Soft</option>
<option value="normal">Normal</option>
<option value="firm">Firm</option>
<option value="hard">Hard</option>
</select>
</div>
<div className="mb-4">
<label className="block text-gray-700 text-sm font-medium mb-2">Color</label>
<div className="grid grid-cols-4 gap-2">
<button
className={`h-10 rounded-lg !rounded-button ${diaperColor === 'yellow' ? 'ring-2 ring-blue-500' : ''}`}
style={{ backgroundColor: '#F9E076' }}
onClick={() => setDiaperColor('yellow')}
></button>
<button
className={`h-10 rounded-lg !rounded-button ${diaperColor === 'green' ? 'ring-2 ring-blue-500' : ''}`}
style={{ backgroundColor: '#A3C9A8' }}
onClick={() => setDiaperColor('green')}
></button>
<button
className={`h-10 rounded-lg !rounded-button ${diaperColor === 'brown' ? 'ring-2 ring-blue-500' : ''}`}
style={{ backgroundColor: '#8B5A2B' }}
onClick={() => setDiaperColor('brown')}
></button>
<button
className={`h-10 rounded-lg !rounded-button ${diaperColor === 'black' ? 'ring-2 ring-blue-500' : ''}`}
style={{ backgroundColor: '#3A3A3A' }}
onClick={() => setDiaperColor('black')}
></button>
</div>
</div>
</>
)}
<div className="mb-4">
<label className="block text-gray-700 text-sm font-medium mb-2">Notes</label>
<textarea
value={diaperNotes}
onChange={(e) => setDiaperNotes(e.target.value)}
className="w-full p-2 border border-gray-300 rounded-lg h-20"
placeholder="Any additional observations..."
></textarea>
</div>
<div className="mb-4">
<label className="block text-gray-700 text-sm font-medium mb-2">Take a Photo</label>
<div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
{diaperImage ? (
<div className="relative">
<img src={diaperImage} alt="Diaper" className="max-h-40 mx-auto rounded-lg" />
<button
onClick={() => setDiaperImage('')}
className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center !rounded-button"
>
<i className="fas fa-times text-xs"></i>
</button>
</div>
) : (
<button
onClick={handleTakePhoto}
className="w-full py-3 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center !rounded-button"
>
<i className="fas fa-camera mr-2"></i>
Take Photo
</button>
)}
</div>
{diaperImage && !isAnalyzing && (
<button
onClick={analyzeDiaperImage}
className="mt-2 w-full py-2 bg-green-500 text-white rounded-lg flex items-center justify-center !rounded-button"
>
<i className="fas fa-microscope mr-2"></i>
Analyze with AI
</button>
)}
{isAnalyzing && (
<div className="mt-2 text-center">
<div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mr-2"></div>
<span className="text-blue-500">Analyzing...</span>
</div>
)}
{analysisResult && (
<div className="mt-2 p-3 bg-blue-50 rounded-lg">
<h4 className="font-medium text-blue-700 mb-1">AI Analysis Result:</h4>
<p className="text-sm">{analysisResult}</p>
</div>
)}
</div>
<div className="flex space-x-2 mt-6">
<button
className="flex-1 py-2 bg-gray-300 rounded-lg !rounded-button"
onClick={() => document.getElementById('diaperModal')?.classList.add('hidden')}
>
Cancel
</button>
<button
className="flex-1 py-2 bg-blue-500 text-white rounded-lg !rounded-button"
onClick={handleDiaperChange}
>
Save
</button>
</div>
</div>
</div>
</div>
{/* Cry Translator Modal */}
{showCryModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
<div className="bg-white rounded-lg w-11/12 max-w-md">
<div className="p-4 border-b border-gray-200">
<div className="flex justify-between items-center">
<h3 className="font-medium text-lg">Baby Cry Translator</h3>
<button
onClick={() => setShowCryModal(false)}
className="text-gray-500 hover:text-gray-700 !rounded-button"
>
<i className="fas fa-times"></i>
</button>
</div>
</div>
<div className="p-4">
<div className="text-center mb-6">
<div className="w-24 h-24 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3">
<i className={`fas ${isListening ? 'fa-microphone-alt text-red-500 animate-pulse text-3xl' : 'fa-volume-up text-purple-500 text-3xl'}`}></i>
</div>
<h4 className="font-medium text-lg">
{isListening ? 'Listening to baby...' : cryAnalysisResult ? 'Analysis Complete' : 'Ready to Listen'}
</h4>
<p className="text-sm text-gray-600 mt-1">
{isListening ? 'Please keep the phone near your baby' : cryAnalysisResult ? `Your baby is likely ${cryAnalysisResult.toLowerCase()}` : 'Press the button to start listening'}
</p>
</div>
{cryAnalysisResult && (
<div className="bg-purple-50 p-4 rounded-lg mb-6">
<div className="flex justify-between items-center mb-2">
<h5 className="font-medium">Analysis Result</h5>
<span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">{cryConfidence}% confidence</span>
</div>
<p className="text-lg font-semibold text-purple-700 mb-2">{cryAnalysisResult}</p>
<div className="mt-3 border-t border-purple-200 pt-3">
<h6 className="font-medium text-sm mb-2">Suggested Actions:</h6>
{cryAnalysisResult === 'Hungry' && (
<ul className="text-sm space-y-1">
<li className="flex items-start">
<i className="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>
<span>Offer breast or bottle feeding</span>
</li>
<li className="flex items-start">
<i className="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>
<span>Check if baby is due for a feeding</span>
</li>
</ul>
)}
{cryAnalysisResult === 'Tired' && (
<ul className="text-sm space-y-1">
<li className="flex items-start">
<i className="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>
<span>Create a calm environment</span>
</li>
<li className="flex items-start">
<i className="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>
<span>Try swaddling and gentle rocking</span>
</li>
</ul>
)}
{cryAnalysisResult === 'Discomfort' && (
<ul className="text-sm space-y-1">
<li className="flex items-start">
<i className="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>
<span>Check diaper and change if needed</span>
</li>
<li className="flex items-start">
<i className="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>
<span>Check for clothing issues or temperature</span>
</li>
</ul>
)}
{cryAnalysisResult === 'Needs burping' && (
<ul className="text-sm space-y-1">
<li className="flex items-start">
<i className="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>
<span>Hold baby upright against your shoulder</span>
</li>
<li className="flex items-start">
<i className="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>
<span>Gently pat or rub baby's back</span>
</li>
</ul>
)}
{cryAnalysisResult === 'Wants attention' && (
<ul className="text-sm space-y-1">
<li className="flex items-start">
<i className="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>
<span>Hold, cuddle, or talk to your baby</span>
</li>
<li className="flex items-start">
<i className="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>
<span>Try gentle play or singing</span>
</li>
</ul>
)}
{cryAnalysisResult === 'Overstimulated' && (
<ul className="text-sm space-y-1">
<li className="flex items-start">
<i className="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>
<span>Move to a quieter, dimmer environment</span>
</li>
<li className="flex items-start">
<i className="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>
<span>Hold baby close and speak softly</span>
</li>
</ul>
)}
</div>
</div>
)}
<div className="mb-6">
<h5 className="font-medium mb-3">Recent Cry Analysis</h5>
<div className="space-y-2">
{cryHistory.map((item, index) => (
<div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-full">
<div>
<p className="font-medium text-sm">{item.reason}</p>
<p className="text-xs text-gray-500">{item.time}</p>
</div>
<span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{item.confidence}%</span>
</div>
))}
</div>
</div>
<div className="flex space-x-2">
<button
className="flex-1 py-3 bg-gray-200 rounded-lg !rounded-button"
onClick={() => setShowCryModal(false)}
>
Close
</button>
{!isListening ? (
<button
className="flex-1 py-3 bg-purple-600 text-white rounded-lg flex items-center justify-center !rounded-button"
onClick={startCryListening}
>
<i className="fas fa-microphone mr-2"></i>
Start Listening
</button>
) : (
<button
className="flex-1 py-3 bg-red-500 text-white rounded-lg flex items-center justify-center !rounded-button"
onClick={stopCryListening}
>
<i className="fas fa-stop-circle mr-2"></i>
Stop
</button>
)}
</div>
</div>
</div>
</div>
)}
{/* Header */}
<div className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
<div className="flex justify-between items-center p-4">
<div className="flex items-center">
<h1 className="text-xl font-bold text-blue-500">BabyBloom</h1>
</div>
<div className="flex items-center">
<p className="text-sm text-gray-500 mr-3">{currentDate}</p>
<button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer !rounded-button">
<i className="fas fa-bell text-gray-500"></i>
</button>
</div>
</div>
</div>
{/* Main Content */}
<main>
{activeTab === 'baby' && renderBabyDashboard()}
{activeTab === 'mom' && renderMomDashboard()}
{activeTab === 'community' && renderCommunityDashboard()}
{activeTab === 'profile' && renderProfileDashboard()}
</main>
{/* Footer Tab Bar */}
<div className="fixed bottom-0 left-0 right-0 bg-white shadow-t z-10">
<div className="grid grid-cols-4 text-center">
<button
className={`p-3 cursor-pointer !rounded-button ${activeTab === 'baby' ? 'text-blue-500' : 'text-gray-500'}`}
onClick={() => setActiveTab('baby')}
>
<i className="fas fa-baby text-xl mb-1 block"></i>
<span className="text-xs">Baby</span>
</button>
<button
className={`p-3 cursor-pointer !rounded-button ${activeTab === 'mom' ? 'text-blue-500' : 'text-gray-500'}`}
onClick={() => setActiveTab('mom')}
>
<i className="fas fa-heart text-xl mb-1 block"></i>
<span className="text-xs">Mom</span>
</button>
<button
className={`p-3 cursor-pointer !rounded-button ${activeTab === 'community' ? 'text-blue-500' : 'text-gray-500'}`}
onClick={() => setActiveTab('community')}
>
<i className="fas fa-users text-xl mb-1 block"></i>
<span className="text-xs">Community</span>
</button>
<button
className={`p-3 cursor-pointer !rounded-button ${activeTab === 'profile' ? 'text-blue-500' : 'text-gray-500'}`}
onClick={() => setActiveTab('profile')}
>
<i className="fas fa-user text-xl mb-1 block"></i>
<span className="text-xs">Profile</span>
</button>
</div>
</div>
</div>
);
};
export default App
