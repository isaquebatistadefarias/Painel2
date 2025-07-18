+const { createClient } = supabase;
+const SUPABASE_URL = "https://wrayfqfxrxizltezkjrr.supabase.co";
+const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyYXlmcWZ4cnhpemx0ZXpranJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3ODA2ODksImV4cCI6MjA2ODM1NjY4OX0.OP6XzwZ840PVj_0Oah0sSOfalWk5SH7xBDcQPVtaT8s";
+
+window.supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
+
+window.checkLogin = async function () {
+  const { data } = await supabaseClient.auth.getUser();
+  if (!data.user) {
+    window.location.href = "login.html";
+  }
+};
+
+window.logout = function () {
+  supabaseClient.auth.signOut().then(() => {
+    window.location.href = "login.html";
+  });
+};
 
