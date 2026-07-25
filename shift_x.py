import re

file_path = "src/components/landing/agent-network-flow.tsx"
with open(file_path, "r") as f:
    content = f.read()

# Replace x: 110, etc in paths
content = re.sub(r'x:\s*110\b', 'x: 140', content)
content = re.sub(r'x:\s*400\b', 'x: 430', content)
content = re.sub(r'x:\s*700\b', 'x: 730', content)
content = re.sub(r'x:\s*990\b', 'x: 1020', content)

# Replace renderFlowNode(110, etc
content = re.sub(r'renderFlowNode\(110,', 'renderFlowNode(140,', content)
content = re.sub(r'renderFlowNode\(400,', 'renderFlowNode(430,', content)
content = re.sub(r'renderFlowNode\(700,', 'renderFlowNode(730,', content)
content = re.sub(r'renderFlowNode\(990,', 'renderFlowNode(1020,', content)

# Replace x === 110, etc in getActivePathIndices
content = re.sub(r'x\s*===\s*110\b', 'x === 140', content)
content = re.sub(r'x\s*===\s*400\b', 'x === 430', content)
content = re.sub(r'x\s*===\s*700\b', 'x === 730', content)
content = re.sub(r'x\s*===\s*990\b', 'x === 1020', content)

# Replace comments like // x = 110
content = re.sub(r'x\s*=\s*110\b', 'x = 140', content)
content = re.sub(r'x\s*=\s*400\b', 'x = 430', content)
content = re.sub(r'x\s*=\s*700\b', 'x = 730', content)
content = re.sub(r'x\s*=\s*990\b', 'x = 1020', content)

with open(file_path, "w") as f:
    f.write(content)

