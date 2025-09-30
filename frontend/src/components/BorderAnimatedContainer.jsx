function BorderAnimatedContainer({ children }) {
  return (
    <div
      className="w-full h-full p-px
        [background:linear-gradient(45deg,theme(colors.slate.900),theme(colors.slate.800)_50%,theme(colors.slate.900))_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,theme(colors.cyan.500)_86%,theme(colors.cyan.300)_90%,theme(colors.cyan.500)_94%,theme(colors.slate.600/.48))_border-box]
        border-2 border-transparent rounded-2xl animate-border flex overflow-hidden"
    >
      {children}
    </div>
  );
}

export default BorderAnimatedContainer;
