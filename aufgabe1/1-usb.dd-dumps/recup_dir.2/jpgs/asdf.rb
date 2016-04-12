["monkey", "gator", "gumbo"].each do |line|
    Dir.entries(".").select {|file| file.end_with? ".jpg"}.each do |file|
    cmd = "java -jar ../../../jar.jar x -p #{line} -e output#{file} #{file}"
    puts cmd
    `#{cmd}`
  end
end
file.close
