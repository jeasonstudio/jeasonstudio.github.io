(function () {
  if (location.pathname.startsWith('/posts/')) {
    var gitalk = new Gitalk({
      clientID: 'd3781f2a3b8472ad5cff',
      clientSecret: '5acc2cc8669b7527e671f6139482e219e4bc8df3',
      repo: 'jeasonstudio.github.io',
      owner: 'jeasonstudio',
      admin: ['jeasonstudio'],
      id: location.pathname,      // Ensure uniqueness and length less than 50
      distractionFreeMode: false  // Facebook-like distraction free mode
    })
    gitalk.render('gitalk-container')
  }
})()
