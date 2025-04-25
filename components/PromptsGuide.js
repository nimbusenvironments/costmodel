export default function PromptsGuide() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Guide to Effective Prompts</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-800">Be Specific</h3>
          <p className="text-sm text-gray-600">Include dimensions, quantities, and quality level when possible.</p>
          <div className="mt-1 text-xs bg-gray-100 p-2 rounded">
            ✅ "Install 200 sq ft of hardwood flooring in living room"<br />
            ❌ "New flooring"
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-800">Describe Materials</h3>
          <p className="text-sm text-gray-600">Mention specific materials or quality ranges you're considering.</p>
          <div className="mt-1 text-xs bg-gray-100 p-2 rounded">
            ✅ "Kitchen renovation with quartz countertops and stainless appliances"<br />
            ❌ "Kitchen renovation"
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-800">Include Context</h3>
          <p className="text-sm text-gray-600">Mention if it's new construction, renovation, replacement, etc.</p>
          <div className="mt-1 text-xs bg-gray-100 p-2 rounded">
            ✅ "Replace existing fence with 6ft privacy fence, 120 linear feet"<br />
            ❌ "Need fence estimate"
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-800">Sample Prompts</h3>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>"10x12 wooden deck with pressure-treated lumber, including steps and railing"</li>
            <li>"Full bathroom remodel in 5x8 space, mid-range fixtures, keeping existing plumbing"</li>
            <li>"Marketing campaign for small business launch including social media, Google ads, and email"</li>
            <li>"Commercial office space renovation, 2000 sq ft, open concept with 3 private offices"</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 